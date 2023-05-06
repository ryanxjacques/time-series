/*
Team: Time Lords
Author(s): Joseph Erlinger
Description: Backend JavaScript code for downloading TS train data.
             Provides functionality for downloading submitted data.
Last Modified: 5/3/2023
*/

/* -------------------------------------------------------------------------- */
/*                                  Preamble                                  */
/* -------------------------------------------------------------------------- */

// Import express, filesystem, and database modules.
const express = require('express');
const fs = require('fs');
const db = require('../js_modules/database');

// Create router object.
const download = express.Router();

// Connect to database.
const connection = db.connectToDataBase('time_series', 'download.js->time_series ');

// To easily convert JSON data to something else.
const jsonexport = require('jsonexport');

/* -------------------------------------------------------------------------- */
/*                                  Main Body                                 */
/* -------------------------------------------------------------------------- */

// User's post to this address to recieve a file.
download.post('/', (req, res) => {
  const { id } = req.body;
  // Set headers to indicate that we're sending the client a cvs file.
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="data.csv"');
  
  // Download the time-series data from the database and convert it to csv.
  downloadFile(id).then(() => {
    // The filepath for the downloaded file on the server.
    const filePath = '/var/www/html/downloads/data.csv';
    // Read the file so that we can send the data to the user.
    readFile(filePath).then(response => {
      res.send(response);
    }).catch(error => {
      console.log(error)
    });
  });
});

// Download time-series data from the database.
// Input is the id of the time series.
// Output is a csv file written to /var/www/html/downloads/data.csv 
const downloadFile = (id) => {
  const promise = new Promise((resolve, reject) => {
    // Query the metadata that is associated with the time series id.
    db.getFirstRecord(connection, 'ts_data', { ts_id: id }).then(response => {
      const record = response[0];
      // Count how many non-null columns there are.
      let count = 0;
      for (let column in record) {
        if (record[column] != null) {
          count++
        }
      }
      // We want to know how many magnitudes this time series data has.
      count -= 2; // subtract ts_id and ts_datetime columns;

      // Begin our query by adding the ts_datatime column.
      query = ['ts_datetime'];
      for (let i = 1; i <= count; i++) {
        // push is javascript's append method for lists
        // Add a ts_magnitude# columnn for each magnitude the ts data has.
        query.push(`ts_magnitude${i}`);
      }
      // Count how many lines are in the time series data.
      return db.getRecordCount(connection, 'ts_data', { ts_id: id });
    }).then(response => {
      // Let the limit be equal to the total lines in the original ts data.
      let limit = response;
      limit = Math.floor(0.80 * limit); // now the limit is 80% of the original ts data.
      // Select the first 80% of the time series data for the DSMLE.
      return db.getDSMLEData(connection, 'ts_data', query, { ts_id: id }, limit);
    }).then(response => {
      // Convert mySQL data into CSV
      return jsonexport(response);
    }).then(response => {
      // save the CSV data to a file
      fs.writeFile('/var/www/html/downloads/data.csv', response, (err) => {
        if (err) {
          reject('Error writing file:' + err);
        }
        // Success!
        resolve(true);
      });
    }).catch(error => {
      console.error(error);
    });
  });
  return promise;
}

// Simple fs readfile function.
const readFile = (filePath) => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject('Error reading file: ', err);
      }
      resolve(data);
    });
  });
  return promise;
};

// Export file object for server.js to use.
module.exports = download;