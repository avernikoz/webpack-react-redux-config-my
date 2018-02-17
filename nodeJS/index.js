// 1. Можео ли вызвать функцию без аргумента по середине? func(a,b[empty],c)
// 2. Почему если использовать // logWriteStream.end(); то происходят ошибки

// Google key
// AIzaSyBJQ8HoYiJAR3PKDxYkl9MGYD0LcJaTgG4


const fs = require('fs');
const fetch = require('node-fetch');
const googleApiKey = 'AIzaSyBJQ8HoYiJAR3PKDxYkl9MGYD0LcJaTgG4';

// logger
let logWriteStream = fs.createWriteStream('log.txt', {'flags': 'a', 'encoding': 'utf8'});

// logWriteStream.on('finish', (e) => {
//     console.error('Input file with urls not found!');
// });
logWriteStream.on('error', () => {
    console.error('Error in writing to log file!');
});
// logger


let commandArgs = process.argv.slice(2);


if (commandArgs < 2) {
    throw new Error('Not all arguments are passed to the script!');
    // console.error('Not all arguments are passed to the script!');
}
// console.log(process.argv);

let inputFilePath = commandArgs[0];
let outputFilePath = commandArgs[1];


let outputWriteStream = fs.createWriteStream(outputFilePath, {'flags': 'a', 'encoding': 'utf8'});
outputWriteStream.on('error', () => {
    console.error('Error in writing to output file!');
});


let inputFile = fs.readFile(inputFilePath, 'utf8', (err, data) => {

    if (!err) {
        let regexopt = new RegExp(/\n|\r/gi);
        let urlArray = data.split(regexopt);

        urlArray.forEach((currentUrl, currentUrlIndex) => {
            let googlePageSpeedUrl = `https://www.googleapis.com/pagespeedonline/v4/runPagespeed?url=${currentUrl}&strategy=desktop&key=${googleApiKey}`;

            console.log(googlePageSpeedUrl);


            setTimeout(() =>{
                fetch(googlePageSpeedUrl, {timeout: 15000})
                // .then(x => new Promise(resolve => setTimeout(() => resolve(x), 10000)))
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
                    });
            }, currentUrlIndex * 3000);


        });


    }
    else {
        logWriteStream.write(`[ ${new Date().toString()} ] File not found at current path: '${inputFilePath}'\n`, 'utf-8', () => {
            console.error('Input file with urls not found!');
        });
        logWriteStream.end();
    }

});


function sleeper(ms) {
    return function(x) {
        return new Promise(resolve => setTimeout(() => resolve(x), ms));
    };
}