/*
Author: Sterling
*/

const express = require('express');
const timeseries = express.Router();

const db = require('../js_modules/database');

timeseries.get('/', async (req, res) => {
    const connection = db.connectToDataBase('time_series');
    const timeseries_res = await db.getRecordElement(connection, 'ts_metadata', ['ts_id', 'ts_name', 'ts_desc', 'ts_domain', 'ts_units', 'ts_keywords'], true);
    db.disconnect(connection);
    res.json(timeseries_res);
})

module.exports = timeseries;