const insert_record = require("./insert_record.js");
const winston = require('winston');
const fs = require('fs');
const LoggingWinston = require('@google-cloud/logging-winston');
const env = process.env.NODE_ENV || 'development';
//const logDir = '/Users/nilayan/Code/node-projects/scratchpad/galn-133';
const loggingWinston = LoggingWinston();
// Create the log directory if it does not exist
/*
if (!fs.existsSync(logDir)) {
fs.mkdirSync(logDir);
}
*/
const tsFormat = () => (new Date()).toLocaleTimeString();
const logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: 'info'
    }),
	loggingWinston
    /*
    new (winston.transports.File)({
      filename: logDir+'/results.log',
      timestamp: tsFormat,
      level: env === 'development' ? 'debug' : 'info'
    })*/
  ]
});
logger.info("Initializing...");
/*
for(var i=0;i<=1000000;i++){
  insert_record.insert_record(i, logger, bigQueryTable);
  //winston.log("Hello");
}
*/
var i = 0, j = 0;
function insert_record_instantiate(){
  if(j == '10000'){
    return;
  }
  insert_record.insert_record(j, logger);
  i++;
  j++;
  setTimeout(insert_record_instantiate, 5000);
}

insert_record_instantiate();
