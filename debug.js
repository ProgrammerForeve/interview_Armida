const DEBUG_LEVELS = {
  MUTE: -1,
  ERROR: 0,
  WARNING: 1,
  INFO: 2,
  DEBUG:3,

  ALL:Infinity
};

const DEBUG_LEVEL = DEBUG_LEVELS.ALL;

function debug_(promt, level=DEBUG_LEVELS.INFO){
  if (level<=DEBUG_LEVEL){
    const debugLevelName = Object.entries(DEBUG_LEVELS).filter(([k,v])=>v===level)[0][0];
    const text = (-1!==[typeof({}),typeof([])].indexOf(typeof promt))?JSON.stringify(promt, null, " "):promt;
    Logger.log(`[${debugLevelName}] ${text}`)
  };
};

const debugError = (promt) => debug_(promt, DEBUG_LEVELS.ERROR);
const debugWarning = (promt) => debug_(promt, DEBUG_LEVELS.WARNING);
const debugInfo = (promt) => debug_(promt, DEBUG_LEVELS.INFO);
const debugDebug = (promt) => debug_(promt, DEBUG_LEVELS.DEBUG);