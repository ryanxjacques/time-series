const express = require('express');
const view = express.Router();

const db = require('../js_modules/database');

view.get('/timeseries', async (req, res) => {
    const connection = db.connectToDataBase('time_series', 'view.js->time_series ');
    const ts_id = req.query.ts_id;
    const fields = ['ts_id', 'ts_name', 'ts_desc', 'ts_domain', 'ts_units', 'ts_keywords', 'ts_contributor'];
    const condition = 'ts_id = ?';
    const id = [ts_id];
    const timeseries_res = await db.getRecordByCondition(connection, 'ts_metadata', fields, condition, id);
    db.disconnect(connection);
    res.json(timeseries_res);
});

view.get('/users', async (req, res) => {
    const user_connection = db.connectToDataBase('users', 'view.js->users ');
    const ts_connection = db.connectToDataBase('time_series', 'view.js->users ');
    const user_id = req.query.user_id;
    const user_fields = ['id', 'username'];
    const user_condition = 'id = ?';
    const ts_fields = ['ts_id', 'ts_name', 'ts_desc', 'ts_domain', 'ts_units', 'ts_keywords'];
    const ts_condition = 'ts_contributor = ?';
    const id = [user_id];
    const user_res = await db.getRecordByCondition(user_connection, 'users', user_fields, user_condition, id);
    db.disconnect(user_connection);
    const ts_res = await db.getRecordByCondition(ts_connection, 'time_series', ts_fields, ts_condition, id);
    db.disconnect(ts_connection);
    result = [user_res, ts_res];
    res.json(result);
});

module.exports = view;