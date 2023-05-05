/*
Team: Time Lords
Author(s): Sterling Stewart
Description: Backend JavaScript code for browse page.
             Uses Express.js to route & retrieve data
             to be displayed on browse page.
Last Modified: 5/1/2023
*/

/* -------------------------------------------------------------------------- */
/*                                  Preamble                                  */
/* -------------------------------------------------------------------------- */

// Import express & database modules
const express = require('express');
const db = require('../js_modules/database');

// Create router object
const browse = express.Router();

/* -------------------------------------------------------------------------- */
/*                                  Main Body                                 */
/* -------------------------------------------------------------------------- */

// Retrieve TS metadata
browse.get('/timeseries', async (req, res) => {
  const connection = db.connectToDataBase('time_series');
  const fields = ['ts_id', 'ts_name', 'ts_desc', 'ts_domain', 'ts_units', 'ts_keywords'];
  const timeseries_res = await db.getRecordElement(connection, 'ts_metadata', fields, true);
  db.disconnect(connection);
  res.json(timeseries_res);
})

// Retrieve user data
browse.get('/users', async (req, res) => {
  const connection = db.connectToDataBase('users');
  const fields = ['id', 'username'];
  const users_res = await db.getRecordElement(connection, 'users', fields, true);
  db.disconnect(connection);
  res.json(users_res);
})

module.exports = browse;