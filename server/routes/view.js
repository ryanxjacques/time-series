const express = require('express');
const view = express.Router();

const db = require('../js_modules/database');

view.get('/timeseries', async (req, res) => {
    const connection = db.connectToDataBase('time_series');
    const ts_id = req.query.ts_id;
    const fields = ['ts_id', 'ts_name', 'ts_desc', 'ts_domain', 'ts_units', 'ts_keywords'];
    const condition = `ts_id = '${ts_id}`;
    const timeseries_res = await db.getRecordElement(connection, 'ts_metadata', fields, condition);
    db.disconnect(connection);
    res.json(timeseries_res);
});

view.get('/users', async (req, res) => {
    const connection = db.connectToDataBase('users');
    const user_id = req.query.user_id;
    const fields = ['id', 'username'];
    const condition = `tuser_id = '${user_id}`;
    const user_res = await db.getRecordElement(connection, 'users', fields, condition);
    db.disconnect(connection);
    res.json(user_res);
});

module.exports = view;