const DEFAULT_LOCALE = "RU";

const TOAST_DURATION = 10;

const DataFormatGoods = {
  article:        {description: "Артикул",                                      position: 0},
  nomeclature:    {description: "Номенклатура",                                 position: 1},
  name:           {description: "Название",                                     position: 2},
  volume:         {description: "Объем одной единицы",                          position: 3},
  mass:           {description: "Вес одной единицы",                            position: 4},
  countInPacket:  {description: "Количество которое вмещается в одну коробку",  position: 5},
  duration:       {description: "Срок производства",                            position: 6},
  count:          {description: "Кол-во",                                       position: 7},  
};

const DataFormatOrders = {
  goods: {
    description: "Общий список товаров, с количеством каждого",
    position: 0,
    f:(goods)=>{
      return goods.map(good=>{
        return `${good[DataFormatGoods.name.position]}: ${good[DataFormatGoods.count.position]}`;
      }).join("\n");
    },
  },
  date: {
    description: "Дата заказа",
    position: 1,
    f: (goosd)=>{
      return new Date();
    },
  },
  maxDuration: {
    description: "Срок готовности с производства, сут",
    position: 2,
    f:(goods)=>{
      let maxDuration = Math.max.apply(null, goods.map(good=>good[DataFormatGoods.duration.position]));
      return maxDuration;
    },
  },
  deadline: {
    description: "Дата готовности с производства",
    position: 3,
    f:(goods)=>{
      let maxDuration = Math.max.apply(null, goods.map(good=>good[DataFormatGoods.duration.position]));
      return new Date((new Date().getTime()) + (+maxDuration*24*60*60*1000));
    },
  },
  volumeInM3Min:{
    description: "Объем заказа в кубометрах (без упаковки)",
    position: 4,
    f:(goods)=>{
      return goods.reduce((acc,row)=>acc+row[DataFormatGoods.volume.position]*row[DataFormatGoods.count.position],0);      
    },
  },
  volumeInM3Max:{
    description: "Объем заказа в кубометрах (с упаковкой в коробки)",
    position: 5,
    f:(goods)=>{      
      return goods.reduce((acc,row)=>acc+Math.ceil(row[DataFormatGoods.count.position]/row[DataFormatGoods.countInPacket.position])*row[DataFormatGoods.volume.position]*row[DataFormatGoods.countInPacket.position],0);
    },
  },
  volumeInBox: {
    description: "Объем заказа в коробках",
    position: 6,
    f:(goods)=>{
      return goods.reduce((acc,row)=>{
        return acc+Math.ceil(row[DataFormatGoods.count.position]/row[DataFormatGoods.countInPacket.position]);
      },0);
    },
  },
  mass: {
    description: "Масса нетто, кг",
    position: 7,
    f:(goods)=>{
      return goods.reduce((acc,row)=>{
        return acc+row[DataFormatGoods.count.position]*row[DataFormatGoods.mass.position];
      },0);
    },
  },
  goodsInfo:  {
    description: "Расшифровка по каждому товару: артикул, номенклатура, количество",
    position: 8,
    f:(goods)=>{
      return goods.map(good=>{
        return `${good[DataFormatGoods.article.position]} [${good[DataFormatGoods.nomeclature.position]}]: ${good[DataFormatGoods.count.position]}`;
      }).join("\n");
    },
  },
};

const SHEETS = {
    DATA:     "data",
    ORDERS:   "orders",
    SETTINGS: "settings",
  };
  
const RANGES = {
  DATA:             { sheet: SHEETS.DATA,   range:"A2:H"  },
  ORDERS:           { sheet: SHEETS.ORDERS, range:"A2:G"  },
  ORDERS_HEADER:    { sheet: SHEETS.ORDERS, range:"A1:1"  },
};