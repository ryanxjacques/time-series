/*
Team: Time Lords
Author(s): Sterling Stewart
Description: Backend JavaScript code for search page.
             Uses Express.js to route & retrieve data
             to be displayed on search page.
Last Modified: 5/3/2023
*/

const express = require('express');
const search = express.Router();
const db = require('../js_modules/database');

// Retrieve TS data based on search term.
search.get('/timeseries', async (req, res) => {
  const connection = db.connectToDataBase('time_series', 'search.js->time_series ');
  const searchTerm = req.query.query;
  const fields = ['ts_id', 'ts_name', 'ts_desc', 'ts_domain', 'ts_units', 'ts_keywords'];
  const conditions = `ts_id = ? OR 
                      ts_name LIKE ? OR 
                      ts_desc LIKE ? OR 
                      ts_domain LIKE ? OR 
                      ts_units LIKE ? OR 
                      ts_keywords LIKE ?`;
  const searchValues = [searchTerm, `%${searchTerm}%`, `%${searchTerm}%`,
    `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`];
  const timeseries_res = await db.getRecordByCondition(connection, 'ts_metadata', fields, conditions, searchValues);
  db.disconnect(connection);
  res.json(timeseries_res);
});

// Retrieve user data based on search term.
search.get('/users', async (req, res) => {
  const connection = db.connectToDataBase('users', 'search.js->users ');
  const searchTerm = req.query.query;
  const fields = ['id', 'username'];
  const conditions = `id = ? OR username LIKE ?`;
  const searchValues = [searchTerm, `%${searchTerm}%`];
  const users_res = await db.getRecordByCondition(connection, 'users', fields, conditions, searchValues);
  db.disconnect(connection);
  res.json(users_res);
});

module.exports = search;