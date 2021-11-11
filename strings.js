const GET_LOCALE = ()=>{
  let props = PropertiesService.getScriptProperties();
  let locale = props.getProperty("LOCALE");
  if (!locale){
    props.setProperty("LOCALE", DEFAULT_LOCALE);
    return DEFAULT_LOCALE;
  }else{
    return locale;
  };
};

const STRINGS = {
  "RU":{
    Error:              "❗ Ошибка",
    OK:                 "OK",
    NoItemsToOrder:     "Нет позиций для заказа",
    OrderHasBeenSaved:  "💾 Заказ сохранён",
    MenuCreateOrder:    "Создать заказ",
    MenuLocale:         "A文 Язык интерфейса",
  },
  "EN":{
    Error:              "❗ Error",
    OK:                 "OK",
    NoItemsToOrder:     "No items to order",
    OrderHasBeenSaved:  "💾 The order has been saved",
    MenuCreateOrder:    "New order",
    MenuLocale:         "A文 Language",
  },
};