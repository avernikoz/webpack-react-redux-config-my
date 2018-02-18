// 1. Можео ли вызвать функцию без аргумента по середине? func(a,b[empty],c) // Да, можно, вызывай как null
// 2. Почему если использовать // logWriteStream.end(); то происходят ошибки
// 3. Можно ли как-то реализовать retry(3) по-другому?
// 4. Как отследить, что файл, в который открыт поток, был удалён?
// 5. Два ретурна - это бэд прэктис?
// 6. Promise.all даже если были reject

const config = require('./config');

const readline = require('readline');
const fetch = require('node-fetch');

const [inputFilePath, outputFilePath] = require('./checkArgumentsCount')(process.argv.slice(2));
const [inputReadStream,outputWriteStream] = require('./io')(inputFilePath,outputFilePath);
const logWriteStream = require('./logStream');
const logError = require('./logError');


let lineNumber = 0;
let inputLineReader = readline.createInterface({input: inputReadStream})
    .on('line', (line) => {
        lineNumber++;
        processURL(line,lineNumber);
    });

function processURL(currentUrl, lineNumber) {

    let googlePageSpeedUrl = `${config.api.url}?url=${currentUrl}&strategy=${config.api.strategy}&key=${config.api.key}`;
    setTimeout(() => {
        fetch(googlePageSpeedUrl, {timeout: config.fetch.timeout})
            .then(res => res.json())
            .then(res => (res.hasOwnProperty('error') ? Promise.reject(new Error(res.error.message)) : res))
            .then(res => {
                outputWriteStream.write(`${JSON.stringify(res, null, '\t')} \n`);
            })
            .then(() => {
                logWriteStream.write(`[ ${new Date().toString()} ] ${config.fetch.completedText}: ${currentUrl}\n`);
            })
            .catch(err => {
                if (err.code === 'ENOTFOUND') {
                    logError(config.error.ENOTFOUND, currentUrl);
                }
                else if (err.type === 'request-timeout') {
                    logError(config.error.TIMEOUT, currentUrl);
                }
                else {
                    logError(err.message, currentUrl);
                }
            });
    }, lineNumber * config.fetch.intervalBetweenEachRequest);
}

