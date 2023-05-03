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
    const connection = db.connectToDataBase('users', 'view.js->time_series ');
    const user_id = req.query.user_id;
    const fields = ['id', 'username'];
    const condition = 'id = ?';
    const id = [user_id];
    const user_res = await db.getRecordByCondition(connection, 'users', fields, condition, id);
    db.disconnect(connection);
    res.json(user_res);
});

module.exports = view;