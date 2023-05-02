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
    const unique_id = {
        ts_id: searchTerm,
        ts_name: `%${searchTerm}%`,
        ts_desc: `%${searchTerm}%`,
        ts_domain: `%${searchTerm}%`,
        ts_units: `%${searchTerm}%`,
        ts_keywords: `%${searchTerm}%`
    };
    const timeseries_res = await db.getRecordElement(connection, 'ts_metadata', fields, unique_id);
    db.disconnect(connection);
    res.json(timeseries_res);
})

search.get('/users', async (req, res) => {
    const connection = db.connectToDataBase('users');
    const searchTerm = req.query.query;
    const fields = ['id', 'username'];
    const unique_id = {
        id: searchTerm,
        username: `%${searchTerm}%`
    };
    const users_res = await db.getRecordElement(connection, 'users', fields, unique_id);
    db.disconnect(connection);
    res.json(users_res);
})

module.exports = search;