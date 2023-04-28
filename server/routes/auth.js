/* 
Author: Joseph
*/

/* -------------------------------------------------------------------------- */
/*                                  Preamble                                  */
/* -------------------------------------------------------------------------- */

//-- Imports --//
const express = require('express');
const auth = express.Router();

const encryptAPI = require('../js_modules/encryptAPI');
const db = require('../js_modules/database');

// Connect to python file. 
encryptAPI.connectToEncrypt();

// Connect to data base.
const connection = db.connectToDataBase('users');



/* -------------------------------------------------------------------------- */
/*                                  Main Body                                 */
/* -------------------------------------------------------------------------- */


auth.post('/', (req, res) => {
  const data = req.body;
  // Here you can do whatever you want with the received data
  console.log(data);
  const msg = {message: '\'/auth\' recieved your message!'};
  res.send(JSON.stringify(msg));
});


auth.post('/login', (req, res) => {
  const data = req.body;
  db.getRecordElement(connection, 'users', 'password', {username: data.username}).then(response => {
    if (response.length != 1) {
      const msg = {message: 'account doesn\'t exist.'};
      res.send(JSON.stringify(msg));
    } else {
      return encryptAPI.verify_password(data.password, response[0].password);
    }
  }).then(response => {
    if (response) {
      const msg = {status: true, message: 'successfully logged in!'};
      res.send(JSON.stringify(msg));
    } else {
      const msg = {status: false, message: 'invalid password.'};
      res.send(JSON.stringify(msg));
    }
  }).catch(err => {
    console.error(err);
  });
});


auth.post('/signup', (req, res) => {
  const data = req.body;
  db.getRecordElement(connection, 'users', 'username', {username: data.username}).then(response => {
    if (response.length != 0) {
      const msg = {status: false, message: 'username already taken.'};
      res.send(JSON.stringify(msg));
    } else {
      return encryptAPI.hash_password(data.password);
    }
  }).then(response => {
    if (response) {  // check if the previous .then statement returned a value.
      const record = {username: data.username, password: response}
      return db.insertRecord(connection, 'users', record);
    }
  }).then( (response) => {
    if (response) {  // check if the previous .then statement returned a value.
      const msg = {status: true, message: 'Made an account!'};
      res.send(JSON.stringify(msg));
    }
  }).catch(err => {
    console.error(err);
  });
});


module.exports = auth;