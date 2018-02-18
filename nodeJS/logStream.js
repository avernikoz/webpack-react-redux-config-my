// logger
const fs = require('fs');
const config = require('./config');

const logWriteStream = fs.createWriteStream(config.log.name, {
    'flags': 'a',
    'encoding': config.log.encoding
}).on('error', (err) => {
    console.error(`ERROR: + ${err}`);
});

module.exports = logWriteStream;