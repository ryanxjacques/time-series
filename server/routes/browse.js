/*
Author: Sterling
*/

const express = require('express');
const timeseries = express.Router();

const db = require('../js_modules/database');

browse.get('https://35.85.29.142:3000/timeseries', async (req, res) => {
    const connection = db.connectToDataBase('time_series');
    const timeseries_res = await db.getRecordElement(connection, 'ts_metadata', ['ts_id', 'ts_name', 'ts_desc', 'ts_domain', 'ts_units', 'ts_keywords'], true);
    db.disconnect(connection);
    res.json(timeseries_res);
})

browse.get('https://35.85.29.142:3000/users', async (req, res) => {
    const connection = db.connectToDataBase('users');
    const users_res = await db.getRecordElement(connection, 'users', ['id', 'username'], true);
    db.disconnect(connection);
    res.json(users_res);
})

module.exports = browse;