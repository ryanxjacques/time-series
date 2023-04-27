/* 
Author: Joseph
*/

/* -------------------------------------------------------------------------- */
/*                                  Preamble                                  */
/* -------------------------------------------------------------------------- */

//-- Imports --//
const express = require('express');
const login = express.Router();

const user_auth = require('../js_modules/user_auth');
const db = require('../js_modules/database');

// This is the python file we will be communicating with.
const scriptPath = '/var/www/html/server/python_modules/encrypt.py';

// Some configurations.
const pyShellOptions = {
  mode: 'text',
  pythonOptions: ['-u'], // get print results in real-time
  args: [process.env.PEPPER]
};

// Connect to python file. 
user_auth.connectToPython(scriptPath, pyShellOptions)

//
const connection = db.connectToDataBase('users');



/* -------------------------------------------------------------------------- */
/*                                  Main Body                                 */
/* -------------------------------------------------------------------------- */

login.post('/', (req, res) => {
  const data = req.body;
  // Here you can do whatever you want with the received data
  console.log(data);
  const msg = {message: '\'/auth\' recieved your message!'};
  res.send(JSON.stringify(msg));
});

login.post('/login', (req, res) => {
  const data = req.body;
  console.log('Received data: ', data.username, data.password);

  db.getRecordElement(connection, 'users', 'password', {username: data.username}).then(response => {
    if (response.length != 1) {
      const msg = {message: 'account doesn\'t exist.'};
      res.send(JSON.stringify(msg));
      return
    } else {
      console.log(`Retrieved hashed password: ${response[0].password}`);
      return user_auth.verify_password(data.password, response[0].password);
    }
  }).then(response => {
    if (response == false) {
      const msg = {status: false, message: 'invalid password.'};
      res.send(JSON.stringify(msg));
      return
    } else {
      const msg = {status: true, message: 'successfully logged in!'};
      res.send(JSON.stringify(msg));
      return
    }
  }).catch(err => {
    console.log(err);
  });
});

login.post('/signin', (req, res) => {
  const data = req.body;
  console.log('Received data: ', data.username, data.password);

  db.getRecordElement(connection, 'users', 'username', {username: data.username}).then(response => {
    if (response.length != 0) {
      const msg = {status: false, message: 'username already taken.'};
      res.send(JSON.stringify(msg));
      return
    } else {
      return user_auth.hash_password(data.password);
    }
  }).then(response => {
    console.log(`Input password: ${data.password}`)
    console.log(`Hashed password: ${response}`);
    const record = {username: data.username, password: response}
    return db.insertRecord(connection, 'users', record);
  }).then( () => {
    const msg = {status: true, message: 'Made an account!'};
    res.send(JSON.stringify(msg));
  }).catch(err => {
    console.log(err);
  });
});

module.exports = login;