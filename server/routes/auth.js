/*
Team: Time Lords
Author(s): Joseph Erlinger
Description: Backend JavaScript code for authenticating login/sign-up.
Last Modified: 5/3/2023
*/

/* -------------------------------------------------------------------------- */
/*                                  Preamble                                  */
/* -------------------------------------------------------------------------- */

//-- Imports --//
const express = require('express');
const encryptAPI = require('../js_modules/encryptAPI');
const db = require('../js_modules/database');

// Create router object.
const auth = express.Router();

// Connect to python file. 
encryptAPI.connectToEncrypt();

// Connect to data base.
const connection = db.connectToDataBase('users', 'auth.js->users ');


/* -------------------------------------------------------------------------- */
/*                                  Main Body                                 */
/* -------------------------------------------------------------------------- */


auth.post('/login', (req, res) => {
  const data = req.body;
  // Check if username exists
  db.getRecordElement(connection, 'users', 'password', { username: data.username }).then(response => {
    if (response.length != 1) {
      const msg = { message: 'account doesn\'t exist.' };
      res.send(JSON.stringify(msg));
    } else {
      // If username exists, Verify if passwords match.
      return encryptAPI.verify_password(data.password, response[0].password);
    }
  }).then(response => {
    if (response) {
      const msg = { status: true, message: 'successfully logged in!' };
      // Add user to the active_users db.
      db.insertRecord(connection, 'active_users', { uuid: data.uuid, username: data.username });
      res.send(JSON.stringify(msg));
    } else {
      const msg = { status: false, message: 'invalid password.' };
      res.send(JSON.stringify(msg));
    }
  }).catch(err => {
    console.error(err);
  });
});

auth.post('/is-active?', (req, res) => {
  const { uuid } = req.body;
  // Check if user is logged on in this browser.
  db.getRecordElement(connection, 'active_users', 'uuid', { uuid: uuid }).then(response => {
    if (response.length == 1) {
      const msg = { status: true };
      res.send(JSON.stringify(msg));
    } else {
      const msg = { status: false };
      res.send(JSON.stringify(msg));
    }
  });
});

auth.post('/logout', (req, res) => {
  const { uuid } = req.body;
  // Remove user from active users
  db.deleteRecord(connection, 'active_users', { uuid: uuid }).then(response => {
    const msg = { status: true };
    res.send(JSON.stringify(msg));
  }).catch(err => {
    console.error(err);
  });
});

auth.post('/signup', (req, res) => {
  const data = req.body;
  // Check if username already exists in users database.
  db.getRecordElement(connection, 'users', 'username', { username: data.username }).then(response => {
    if (response.length != 0) {  // username is taken
      const msg = { status: false, message: 'username already taken.' };
      res.send(JSON.stringify(msg));
    } else {
      // Encrypt password
      return encryptAPI.hash_password(data.password);
    }
  }).then(response => {
    if (response) {  // check if the previous .then statement returned a value.
      const record = { username: data.username, password: response }
      // Insert the encrypted password and username into the user's database
      return db.insertRecord(connection, 'users', record);
    }
  }).then((response) => {
    if (response) {  // check if the previous .then statement returned a value.
      const msg = { status: true, message: 'Made an account!' };
      // Send a successful sign-up message to the user.
      res.send(JSON.stringify(msg));
      // Add user to the active_users.
      db.insertRecord(connection, 'active_users', { uuid: data.uuid, username: data.username });
    }
  }).catch(err => {
    console.error(err);
  });
});

// this method is used for retrieving the username associated with a uuid.
auth.post('/username', (req, res) => {
  const { uuid } = req.body;
  // Query the active users where uuid = the user's uuid.
  db.getRecordElement(connection, 'active_users', 'username', { uuid: uuid }).then(response => {
    const msg = { username: response[0].username };
    res.send(JSON.stringify(msg)); // send username to client.
  }).catch(err => {
    console.error(err);
  });
});

module.exports = auth;