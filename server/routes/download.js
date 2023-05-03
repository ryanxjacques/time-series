const express = require('express'); 
const fs = require('fs');
const download = express.Router();

download.get('/', (req, res) => {
  const filePath = '/var/www/html/downloads/helloWorld.txt';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error reading file: ', err);
      res.status(500).send('Error reading file');
      return;
    }

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="data.csv"');
    res.send(data);
  });
});

// Export file object for server.js to use.
module.exports = download;