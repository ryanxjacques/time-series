const express = require('express'); 
const fs = require('fs');
const download = express.Router();
const db = require('../js_modules/database');
const connection = db.connectToDataBase('time_series', 'download.js->time_series ');

// To easily convert JSON data to something else.
const jsonexport = require('jsonexport');

// needs to change to a POST request.
download.get('/', (req, res) => {
  downloadFile('470').then(response => {
    const filePath = '/var/www/html/downloads/data.csv';
    sendFile(filePath);
  });
});


const downloadFile = (id) => {
  db.getFirstRecord(connection, 'ts_data', {ts_id: id}).then(response => {
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
    return db.getRecordElement(connection, 'ts_data', query, {ts_id: id});
  }).then(response => {
    // Convert mySQL data into CSV
    return jsonexport(response);
  }).then(response => {
    // save the CSV data to a file
    fs.writeFile('/var/www/html/downloads/data.csv', response, (err) => {
      if (err) {
        console.error('Error writing file:', err);
      }
      console.log('Data saved to /var/www/html/downloads/data.csv');
      return true;
    });
  }).catch(error => {
    console.error(error);
  });
}

const sendFile = (filePath) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error reading file: ', err);
      res.status(500).send('Error reading file');
      return;
    }

    res.setHeader('Content-Type', 'application/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="data.csv"');
    res.send(data);
  });
};

// Export file object for server.js to use.
module.exports = download;