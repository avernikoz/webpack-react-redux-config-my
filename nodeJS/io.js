const config = require('./config');
const logError = require('./logError');
const logWriteStream = require('./logStream');

const mkdirp = require('mkdirp').sync;
const getDirName = require('path').dirname;
const fs = require('fs');


module.exports = (inputFilePath, outputFilePath) => {

// output
    if (!fs.existsSync(getDirName(outputFilePath))) {
        mkdirp(getDirName(outputFilePath, (err) => {
            if (err) throw Error(`${err}`);
        }));
    }
    const outputWriteStream = fs.createWriteStream(outputFilePath, {
        'flags': 'a',
        'encoding': config.output.encoding
    }).on('error', (err) => {
        console.error(`ERROR: + ${err}`);
    });


// input
    let inputReadStream = fs.createReadStream(inputFilePath, {encoding: config.input.encoding})
        .on('error', (err) => {
            if (err.code === 'ENOENT') {
                logError(config.error.ENOENT, null, inputFilePath);
                logWriteStream.end();
            }
            else {
                logError(err.message, null, inputFilePath);
                logWriteStream.end();
            }
        });

  return [inputReadStream,outputWriteStream]
};