const express = require('express'); 
const fs = require('fs');
const download = express.Router();
const db = require('../js_modules/database');
const connection = db.connectToDataBase('time_series', 'download.js->time_series ');

// To easily convert JSON data to something else.
const jsonexport = require('jsonexport');


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
  db.getFirstRecord(connection, 'ts_data', {ts_id: 470}).then(response => {
    const record = response[0];
    let count = 0;
    for (let column in record) {
      if (record[column] != null) {
        count++
      }
    }

    count -= 2; // subtract ts_id and ts_datetime columns;

    const query = ['ts_datetime'];
    for(let i = 1; i <= count; i++) {
      // push is javascript's append method for lists
      query.push(`ts_magnitude${i}`);
    }

    return db.getRecordElement(connection, 'ts_data', query, {ts_id: 470});
  }).then(response => {
    // Convert mySQL data into CSV

    return jsonexport(response)
    return csvData
  }).then(response => {
    console.log(response);
  });
}


// Export file object for server.js to use.
module.exports = download;