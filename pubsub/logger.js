const winston = require('winston');
const fs = require('fs');
const LoggingWinston = require('@google-cloud/logging-winston');
const env = process.env.NODE_ENV || 'development';
//const logDir = '.';
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
      filename: logDir+'/logger.log',
      timestamp: tsFormat,
      level: env === 'development' ? 'debug' : 'info'
    })
  */
  ]
});
logger.info("Initializing...");

module.exports.logger = logger;
module.exports.tsFormat = tsFormat;
module.exports.env = env;
