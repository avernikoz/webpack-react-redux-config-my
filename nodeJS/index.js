// Google key
// AIzaSyBJQ8HoYiJAR3PKDxYkl9MGYD0LcJaTgG4



const fs = require('fs');
const fetch = require('node-fetch');
const googleApiKey = 'AIzaSyBJQ8HoYiJAR3PKDxYkl9MGYD0LcJaTgG4';


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

        // console.log(urlArray[0]);

        let googlePageSpeedUrl = `https://www.googleapis.com/pagespeedonline/v4/runPagespeed?url=${urlArray[3]}&strategy=desktop&key=${googleApiKey}`;

        fetch(googlePageSpeedUrl)
            .then(res => res.text())
            .then(res => fs.writeFile(outputFilePath,res,'utf8'))
            .then(body => console.log(body));
    }
    else {
        console.error('File not found!');

    }

});


