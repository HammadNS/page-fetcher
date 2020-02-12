const request = require('request');

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// LETS USER KNOW THAT THE FILE HAS SAVED 
const printSaveMsg = () => {
  
    fs.stat(localFile, (err,stats) => {
      const fileSizeInBytes = stats.size;
      console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${localFile}`);
    });
  }

//SAVES THE FILE
const save = (exist, body) => {
  if(!exist) {
    rl.question(`The file ${localFile} exist. Do you want to overwrite it? (Y/N)`, ans => {
      if (ans.toUpperCase() === 'Y') {
        fs.writeFile(localFile, body, printSaveMsg);
      } else if (ans.toUpperCase() === 'N') {
        rl.close();
      } else {
        save(exists);
      }
    });
  }

};

let websiteToFile = (err, httpResponse, htmlBody) => {
  fs.writeFile(localFile, fs.constants.W_OK, (err) => save(err, htmlBody));
};


const cliArgs = process.argv.slice(2);
const url = cliArgs[0];
const localFile = cliArgs[1];

request(url, websiteToFile);




