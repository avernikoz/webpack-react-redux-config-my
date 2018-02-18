const logWriteStream = require('./logStream');
const config = require('./config');

module.exports = function logError(errorMessage, currentUrl, inputFilePath) {
    if (currentUrl) {
        console.log(errorMessage);
        logWriteStream.write(`[ ${new Date().toString()} ] ${config.fetch.inCompletedText}: ${currentUrl}    ERROR: ${errorMessage}  \n`);
    }
    else {
        console.log(errorMessage);
        logWriteStream.write(`[ ${new Date().toString()} ] ${errorMessage}: '${inputFilePath}'\n`, config.log.encoding);
    }
};