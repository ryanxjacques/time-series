const express = require('express'); 
const fs = require('fs');
const download = express.Router();
const db = require('../js_modules/database');
const connection = db.connectToDataBase('time_series', 'download.js->time_series ');

// To easily convert JSON data to something else.
const jsonexport = require('jsonexport');

// needs to change to a POST request.
download.get('/', (req, res) => {

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="data.csv"');

  downloadFile('514').then(() => {
    const filePath = '/var/www/html/downloads/data.csv';
    readFile(filePath).then(response => {
      res.send(response);
    }).catch(error => {
      console.log(error)
    });
  });
});


const downloadFile = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.getFirstRecord(connection, 'ts_data', {ts_id: id}).then(response => {
      const record = response[0];
      let count = 0;
      for (let column in record) {
        if (record[column] != null) {
          count++
        }
      }

      count -= 2; // subtract ts_id and ts_datetime columns;

      query = ['ts_datetime'];
      for(let i = 1; i <= count; i++) {
        // push is javascript's append method for lists
        query.push(`ts_magnitude${i}`);
      }
      return db.getRecordCount(connection, 'ts_data', {ts_id: id});
    }).then(response => {
      let limit = response;
      limit = Math.floor(0.80 * limit);
      return db.getDSMLEData(connection, 'ts_data', query, {ts_id: id}, limit);
    }).then(response => {
      // Convert mySQL data into CSV
      return jsonexport(response);
    }).then(response => {
      // save the CSV data to a file
      fs.writeFile('/var/www/html/downloads/data.csv', response, (err) => {
        if (err) {
          reject('Error writing file:' + err);
        }
        resolve(true);
      });
    }).catch(error => {
      console.error(error);
    });
  });
  return promise;
}

const readFile = (filePath) => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject('Error reading file: ', err);
        // reject.status(500).send('Error reading file');
      }
      resolve(data);
    });
  });
  return promise;
};

// Export file object for server.js to use.
module.exports = download;