  function getValues(rangeInfo){
    return SpreadsheetApp
    .getActiveSpreadsheet()
      .getSheetByName(rangeInfo.sheet)
        .getRange(rangeInfo.range)
          .getValues();
  };
  
  function getRange(rangeInfo){
    return SpreadsheetApp
    .getActiveSpreadsheet()
      .getSheetByName(rangeInfo.sheet)
        .getRange(rangeInfo.range);
  };
  
  function getRangeByData(range, data){
    return range.getSheet().getRange(range.getRow(), range.getColumn(), data.length, data[0].length);
  };
  
  function setDataToRange(range, data){
    return range.getSheet().getRange(range.getRow(), range.getColumn(), data.length, data[0].length).setValues(data);
  };