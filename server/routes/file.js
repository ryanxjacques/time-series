/*
Team: Time Lords
Author(s): Joseph Erlinger
Description: Backend JavaScript code for uploading TS data.
             Uses Node.js & Express.js to route & insert 
             submitted data.
Last Modified: 5/2/2023
*/

const express = require('express');
const file = express.Router();
const multer = require('multer')
const mainAPI = require('../js_modules/mainAPI');

// Connect to data base.
const db = require('../js_modules/database');
const usersConnection = db.connectToDataBase('users', 'file.js->users ');
const tsConnection = db.connectToDataBase('time_series', 'file.js->time_series ');

// Open a connection with main.py!
mainAPI.connectToMain();

// This provides the where and how the server will store the uploaded file.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/var/www/html/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

// Create instance of multer with the specific configuration defined above. 
const upload = multer({ storage })


file.post('/upload', upload.single('uploaded_file'), function (req, res) {
  const message = { message: "Succesfully uploaded file!" };
  res.send(JSON.stringify(message));

  mainAPI.run().then(response => {
    response.forEach((element) => {
      console.log(element);
    });
  });
});

file.post('/metadata', (req, res) => {
  const { username } = req.body;
  delete req.body['username'];

  // send user id.
  db.getRecordElement(usersConnection, 'users', 'id', { username: username }).then(response => {
    const { id } = response[0];
    const message = { id: id };
    res.send(JSON.stringify(message));

    req.body['ts_contributor'] = id;
    console.log(req.body);
    return db.insertRecord(tsConnection, 'ts_metadata', req.body);
  });
});

file.post('/metadata', (req, res) => {
  console.log(req.body);

  const { username } = req.body;

  console.log(username);
  // send user id.
  db.getRecordElement(connection, 'users', 'id', { username: username }).then(response => {
    const message = { id: response[0].id };
    res.send(JSON.stringify(message));
  });
});

// Export file object for server.js to use.
module.exports = file;

