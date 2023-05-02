/*
Author: Sterling
*/

const express = require('express');
const search = express.Router();

const db = require('../js_modules/database');

search.get('/timeseries', async (req, res) => {
    const connection = db.connectToDataBase('time_series');
    const searchTerm = req.query.query;
    const fields = ['ts_id', 'ts_name', 'ts_desc', 'ts_domain', 'ts_units', 'ts_keywords'];
    const conditions = `ts_id = ${searchTerm} OR
                    ts_name LIKE '%${searchTerm}%' OR
                    ts_desc LIKE '%${searchTerm}%' OR
                    ts_domain LIKE '%${searchTerm}%' OR
                    ts_units LIKE '%${searchTerm}%' OR
                    ts_keywords LIKE '%${searchTerm}%'`;
    const timeseries_res = await db.getRecordElement(connection, 'ts_metadata', fields, conditions);
    db.disconnect(connection);
    res.json(timeseries_res);
})

search.get('/users', async (req, res) => {
    const connection = db.connectToDataBase('users');
    const searchTerm = req.query.query;
    const fields = ['id', 'username'];
    const conditions = `id = ${searchTerm} OR username LIKE '%${searchTerm}%'`;
    const users_res = await db.getRecordElement(connection, 'users', fields, conditions);
    db.disconnect(connection);
    res.json(users_res);
})

module.exports = search;