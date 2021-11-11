function onOpen() { 
  let ui = SpreadsheetApp.getUi();
  
  ui.createMenu("▶▶▶")
  .addItem(` ${STRINGS[GET_LOCALE()].MenuCreateOrder} Ctrl+Alt+Shift+1`,'createOrder')
  .addSeparator()
  .addSubMenu(
    createLocaleMenu()
  )
  .addToUi();
};

const createLocaleMenu = ()=>{
  let ui = SpreadsheetApp.getUi();
  let subMenu = ui.createMenu(STRINGS[GET_LOCALE()].MenuLocale);
  Object.keys(STRINGS).forEach(localeKey=>{
    let funcName = `activationLocale${localeKey}`;    
    subMenu = subMenu.addItem(localeKey, funcName);
  });
  return subMenu;
};

function activationLocale(locale){
  PropertiesService.getScriptProperties().setProperty("LOCALE", locale);
  onOpen();
};

(function(self) {
  Object.keys(STRINGS).forEach(localeKey=>{
    let funcName = `activationLocale${localeKey}`;    
    self[funcName] = function() {
      return activationLocale(localeKey);
    };
  });
})(this);