const express = require('express'); 
const fs = require('fs');
const download = express.Router();
const db = require('../js_modules/database');
const connection = db.connectToDataBase('time_series', 'download.js->time_series ');

download.get('/', (req, res) => {
  const filePath = '/var/www/html/downloads/helloWorld.txt';

  // fs.readFile(filePath, (err, data) => {
  //   if (err) {
  //     console.error('Error reading file: ', err);
  //     res.status(500).send('Error reading file');
  //     return;
  //   }

  //   // res.setHeader('Content-Type', 'text/plain');
  //   // res.setHeader('Content-Disposition', 'attachment; filename="data.txt"');
  //   // res.send(data);
  // });
  // console.log(filePath);
  downloadFile('placeholder');
});


const downloadFile = (type) => {
  db.getRecordElement(connection, 'ts_metadata', 'ts_domain', {ts_id: 470}).then(response => {
    const { domain } = response[0];
    const domainCount = domain.split(",").length;
    console.log(domainCount);
  });
  // db.getRecordElement(connection, 'ts_data', columns, {id: id});
}

// Export file object for server.js to use.
module.exports = download;