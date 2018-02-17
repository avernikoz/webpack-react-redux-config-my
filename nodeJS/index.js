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
                    .then(res => {
                            // Refactor this or NOT?
                            if (res.hasOwnProperty('error')) {
                                return Promise.reject(new Error(`${res.error.message}`));
                            }
                            else {
                                return res;
                            }
                        }
                    )
                    .then(res => {
                        outputWriteStream.write(`${JSON.stringify(res, null, '\t')} \n`);
                    })
                    .then(() => {
                        logWriteStream.write(`[ ${new Date().toString()} ] ${config.fetch.completedText}: ${currentUrl}\n`);
                    })
                    .catch(err => {
                        //Refactor this
                        if (err.code === 'ENOTFOUND') {
                            console.log(config.error.ENOTFOUND);
                            logWriteStream.write(`[ ${new Date().toString()} ] ${config.fetch.inCompletedText}: ${currentUrl}    ERROR: ${config.error.ENOTFOUND}  \n`);
                        }
                        else if (err.type === 'request-timeout') {
                            console.log(config.error.TIMEOUT);
                            logWriteStream.write(`[ ${new Date().toString()} ] ${config.fetch.inCompletedText}: ${currentUrl}    ERROR: ${config.error.TIMEOUT}  \n`);
                        }
                        else {
                            console.log(err.message);
                            logWriteStream.write(`[ ${new Date().toString()} ] ${config.fetch.inCompletedText}: ${currentUrl}    ERROR: ${err.message}  \n`);
                        }
                    });
            }, currentUrlIndex * config.fetch.intervalBetweenEachRequest);


        });


    }
    else if (err.code === 'ENOENT') {
        logWriteStream.write(`[ ${new Date().toString()} ] ${config.error.ENOENT}: '${inputFilePath}'\n`, config.log.encoding, () => {
            console.error(config.error.ENOENT);
        });
        logWriteStream.end();
    }
    else {
        logWriteStream.write(`[ ${new Date().toString()} ] ${err.message} \n`, config.log.encoding, () => {
            console.error(err.message);
        });
        logWriteStream.end();
    }

});



