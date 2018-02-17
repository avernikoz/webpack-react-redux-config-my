// 1. Можео ли вызвать функцию без аргумента по середине? func(a,b[empty],c) // Да, можно, вызывай как null
// 2. Почему если использовать // logWriteStream.end(); то происходят ошибки
// 3. Можно ли как-то реализовать retry(3) по-другому?
// 4. Как отследить, что файл, в который открыт поток, был удалён?
// 5. Два ретурна - это бэд прэктис?
// 6. Promise.all даже если были reject

const config = require('./config');

const fs = require('fs');
const mkdirp = require('mkdirp').sync;
const getDirName = require('path').dirname;

const fetch = require('node-fetch');
const commandArgs = process.argv.slice(2);

if (commandArgs < 2) {
    throw new Error('Not all arguments are passed to the script!');
}

const inputFilePath = commandArgs[0];
const outputFilePath = commandArgs[1];



// logger
const logWriteStream = fs.createWriteStream(config.log.name, {'flags': 'a', 'encoding': config.log.encoding}).on('error', (err) => {
    console.error(`ERROR: + ${err}`);
});

// output
if (!fs.existsSync(getDirName(outputFilePath))){
    mkdirp(getDirName(outputFilePath, (err) => {
        if (err) throw Error(`${err}`);
    }));
}
const outputWriteStream = fs.createWriteStream(outputFilePath, {'flags': 'a', 'encoding': config.output.encoding}).on('error', (err) => {
    console.error(`ERROR: + ${err}`);
});


fs.readFile(inputFilePath, config.input.encoding, (err, data) => {

    if (!err) {
        const regexopt = new RegExp(/\n|\r/gi);
        let urlArray = data.split(regexopt);

        urlArray.forEach((currentUrl, currentUrlIndex) => {
            let googlePageSpeedUrl = `${config.api.url}?url=${currentUrl}&strategy=${config.api.strategy}&key=${config.api.key}`;

            console.log(googlePageSpeedUrl);


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
            }, currentUrlIndex * config.fetch.intervalBetweenEachRequest);


        });


    }
    else {
        if (err.code === 'ENOENT') {
            logError(config.error.ENOENT);
            logWriteStream.end();
        }
        else {
            logError(err.message);
            logWriteStream.end();
        }

    }


});



function logError(errorMessage, currentUrl) {
    if (currentUrl) {
        console.log(errorMessage);
        logWriteStream.write(`[ ${new Date().toString()} ] ${config.fetch.inCompletedText}: ${currentUrl}    ERROR: ${errorMessage}  \n`);
    }
    else {
        console.log(errorMessage);
        logWriteStream.write(`[ ${new Date().toString()} ] ${errorMessage}: '${inputFilePath}'\n`, config.log.encoding);
    }
}