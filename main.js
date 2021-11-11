function createOrder(){
  let ss = SpreadsheetApp.getActiveSpreadsheet();

  let data = getValues(RANGES.DATA);
  data = data
              .filter(row=>{
                return row[DataFormatGoods.count.position]!=="";
              });

  if (data.length===0){
    ss.toast(STRINGS[GET_LOCALE()].NoItemsToOrder, STRINGS[GET_LOCALE()].Error, TOAST_DURATION);
    debugError(STRINGS[GET_LOCALE()].NoItemsToOrder);
    return {
      status: "Error",
      errorDescription: STRINGS[GET_LOCALE()].NoItemsToOrder,
    };
  };

  let outData = [];
  let fields = Object.keys(DataFormatOrders);
  for (fieldKey of fields){
    let field = DataFormatOrders[fieldKey];
    let position = field.position;
    let value = field.f(data);
    outData[position] = value;
  };

  let ordersSheet = ss.getSheetByName(SHEETS.ORDERS);
  ordersSheet.appendRow(outData);

  ordersSheet.getRange(ordersSheet.getLastRow(), 1).activate();

  let dataSheet = ss.getSheetByName(RANGES.DATA.sheet);
  let firstDataRow = getRange(RANGES.DATA).getRow();
  let maxRows = dataSheet.getMaxRows();
  if(firstDataRow<maxRows){
    let countRange = dataSheet.getRange(firstDataRow,1+DataFormatGoods.count.position, maxRows-firstDataRow,1);
    countRange.clearContent();
  };

  ss.toast(STRINGS[GET_LOCALE()].OrderHasBeenSaved, STRINGS[GET_LOCALE()].OK, TOAST_DURATION);

  return {
    status: "OK",
  };
};

function updateOrdersHeader(){
  let ordersHeaderData = [];
  let fields = Object.keys(DataFormatOrders);
  for (fieldKey of fields){
    let field = DataFormatOrders[fieldKey];
    ordersHeaderData[field.position] = field.description;
  };

  setDataToRange(getRange(RANGES.ORDERS_HEADER), [ordersHeaderData]);
};