/*
Team: Time Lords
Author(s): Sterling Stewart
Description: Backend JavaScript code for TS & user view pages.
             Uses Express.js to route & retrieve data
             to be displayed on time series & user pages.
Last Modified: 5/4/2023
*/

const express = require('express');
const view = express.Router();
const db = require('../js_modules/database');

// Retrieve time series metadata using ts_id
view.get('/timeseries', async (req, res) => {
  const connection = db.connectToDataBase('time_series', 'view.js->time_series ');
  const ts_id = req.query.ts_id;
  const id = [ts_id];

  // Get TS metadata
  const ts_fields = ['ts_id', 'ts_name', 'ts_desc', 'ts_domain', 'ts_units', 'ts_keywords', 'ts_contributor'];
  const ts_condition = 'ts_id = ?';
  const timeseries_res = await db.getRecordByCondition(connection, 'ts_metadata', ts_fields, ts_condition, id);

  // Get TS solution data
  const ts_connection = db.connectToDataBase('time_series', 'view.js->time_series ');
  const sol_fields = ['DS_MLE_id', 'ts_mape'];
  const sol_condition = 'ts_id = ?';
  const sol_res = await db.getRecordByCondition(ts_connection, 'ts_solutions', sol_fields, sol_condition, id);
  db.disconnect(connection);

  result = [timeseries_res, sol_res];
  
  res.json(result);
});

// Retrieve TS metadata & user data using user id
view.get('/users', async (req, res) => {
  const user_id = req.query.user_id;
  const id = [user_id];

  // Get User info
  const user_connection = db.connectToDataBase('users', 'view.js->users ');
  const user_fields = ['id', 'username'];
  const user_condition = 'id = ?';
  const user_res = await db.getRecordByCondition(user_connection, 'users', user_fields, user_condition, id);
  db.disconnect(user_connection);

  // Get User's TS info
  const ts_connection = db.connectToDataBase('time_series', 'view.js->time_series ');
  const ts_fields = ['ts_id', 'ts_name', 'ts_desc', 'ts_domain', 'ts_units', 'ts_keywords'];
  const ts_condition = 'ts_contributor = ?';
  const ts_res = await db.getRecordByCondition(ts_connection, 'ts_metadata', ts_fields, ts_condition, id);

  // Get User's Solution info
  const sol_fields = ['ts_id', 'ts_mape'];
  const sol_condition = 'DS_MLE_id = ?';
  const sol_res = await db.getRecordByCondition(ts_connection, 'ts_metadata', sol_fields, sol_condition, id);
  db.disconnect(ts_connection);

  result = [user_res, ts_res, sol_res];
  res.json(result);
});

module.exports = view;