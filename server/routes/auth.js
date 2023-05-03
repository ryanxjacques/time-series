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
const connection = db.connectToDataBase('users', 'auth.js->users ');


/* -------------------------------------------------------------------------- */
/*                                  Main Body                                 */
/* -------------------------------------------------------------------------- */


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
      // Add user to the active_users db.
      db.insertRecord(connection, 'active_users', {uuid: data.uuid, username: data.username});
      res.send(JSON.stringify(msg));
    } else {
      const msg = {status: false, message: 'invalid password.'};
      res.send(JSON.stringify(msg));
    }
  }).catch(err => {
    console.error(err);
  });
});

auth.post('/is-active?', (req, res) => {
  const { uuid } = req.body;
  db.getRecordElement(connection, 'active_users', 'uuid', {uuid: uuid}).then(response => {
    if (response.length == 1) {
      const msg = {status: true};
      res.send(JSON.stringify(msg));
    } else {
      const msg = {status: false};
      res.send(JSON.stringify(msg));
    }
  });
});

auth.post('/logout', (req, res) => {
  const { uuid } = req.body;
  db.deleteRecord(connection, 'active_users', {uuid: uuid}).then(response => {
    const msg = {status: true};
    res.send(JSON.stringify(msg));
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
      // Add user to the active_users db.
      db.insertRecord(connection, 'active_users', {uuid: data.uuid, username: data.username});
    }
  }).catch(err => {
    console.error(err);
  });
});

auth.post('/username', (req, res) => {
  const { uuid } = req.body;
  db.getRecordElement(connection, 'active_users', 'username', {uuid: uuid}).then(response => {
    const msg = {username: response[0].username};  
    res.send(JSON.stringify(msg)); // send username to client.
  }).catch(err => {
    console.error(err);
  });
});

module.exports = auth;