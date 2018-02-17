// 1. Можео ли вызвать функцию без аргумента по середине? func(a,b[empty],c)
// 2. Почему если использовать // logWriteStream.end(); то происходят ошибки
// 3. Можно ли как-то реализовать retry(3) по-другому?

// Google key
// AIzaSyBJQ8HoYiJAR3PKDxYkl9MGYD0LcJaTgG4


const fs = require('fs');
const fetch = require('node-fetch');
const googleApiKey = 'AIzaSyBJQ8HoYiJAR3PKDxYkl9MGYD0LcJaTgG4';

// logger
const logWriteStream = fs.createWriteStream('log.txt', {'flags': 'a', 'encoding': 'utf8'});

// logWriteStream.on('finish', (e) => {
//     console.error('Input file with urls not found!');
// });
logWriteStream.on('error', () => {
    console.error('Error in writing to log file!');
});
// logger


const commandArgs = process.argv.slice(2);


if (commandArgs < 2) {
    throw new Error('Not all arguments are passed to the script!');
    // console.error('Not all arguments are passed to the script!');
}
// console.log(process.argv);

const inputFilePath = commandArgs[0];
const outputFilePath = commandArgs[1];


const outputWriteStream = fs.createWriteStream(outputFilePath, {'flags': 'a', 'encoding': 'utf8'});
outputWriteStream.on('error', () => {
    console.error('Error in writing to output file!');
});


fs.readFile(inputFilePath, 'utf8', (err, data) => {

    if (!err) {
        let regexopt = new RegExp(/\n|\r/gi);
        let urlArray = data.split(regexopt);

        urlArray.forEach((currentUrl, currentUrlIndex) => {
            let googlePageSpeedUrl = `https://www.googleapis.com/pagespeedonline/v4/runPagespeed?url=${currentUrl}&strategy=desktop&key=${googleApiKey}`;

            console.log(googlePageSpeedUrl);


            setTimeout(() => {
                fetch(googlePageSpeedUrl, {timeout: 15000})
                    .then(res => res.text())
                    .then(res => {
                        outputWriteStream.write(`${res} \n`);
                        // outputWriteStream.end();
                    })
                    // .then(body => console.log(body))
                    .then(() => {
                        logWriteStream.write(`[ ${new Date().toString()} ] Url processed well!: ${currentUrl}\n`);
                        // logWriteStream.end();
                    })
                    .catch(err => {
                        console.error(err);
                        if (err.code === 'ENOTFOUND'){
                            console.log(`Can't connect to the current API, maybe internet connection was lost.`);
                            logWriteStream.write(`[ ${new Date().toString()} ] Url NOT PROCESSED!: ${currentUrl}    ERROR: ENOTFOUND: Can't connect to the current API, maybe internet connection was lost  \n`);
                        }
                        else if (err.type === 'request-timeout'){
                            console.log(`Timeout error. Slow internet connection OR API server have fall down.`);
                            logWriteStream.write(`[ ${new Date().toString()} ] Url NOT PROCESSED!: ${currentUrl}    ERROR: request-timeout: Timeout error. Slow internet connection OR API server have fallen down.  \n`);
                        }
                        else {
                            console.log(err.message);
                            logWriteStream.write(`[ ${new Date().toString()} ] Url NOT PROCESSED!: ${currentUrl}    ERROR: ${err.message}  \n`);
                        }
                    });
            }, currentUrlIndex * 1);


        });


    }
    else {
        logWriteStream.write(`[ ${new Date().toString()} ] File not found at current path: '${inputFilePath}'\n`, 'utf-8', () => {
            console.error('Input file with urls not found!');
        });
        logWriteStream.end();
    }

});



