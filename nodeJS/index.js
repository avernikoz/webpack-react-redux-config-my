
let fs = require('fs');


let commandArgs = process.argv.slice(2);


if (commandArgs < 2){
    throw new Error('Not all arguments are passed to the script!');
    // console.error('Not all arguments are passed to the script!');
}

let inputFilePath = commandArgs[0];
let outputFilePath = commandArgs[1];

// console.log(process.argv);


let inputFile = fs.readFile(inputFilePath,'utf8', (err, data) => {

    if (!err) {
        let regexopt = new RegExp(/\n|\r/gi);
        let urlArray = data.split(regexopt);
        console.log(urlArray[0]);
    }
    else {
        console.error('File not found!');

    }

});