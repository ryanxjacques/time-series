/*
Team: Time Lords
Author(s): Joseph Erlinger
Description: Backend JavaScript code for homepage.
             Uses Express.js to route & send 
             project & server info.
Last Modified: 5/2/2023
*/

const express = require('express');
const home = express.Router();

// Get project info
home.get('/', (req, res) => {
  res.send('CS 422 - Project 1 - Team 4 - Time Lords');
});

// Send alert notifying message received
home.post('/', (req, res) => {
  const msg = { message: 'We received your message at https://35.85.29.142:3000/' };
  res.send(JSON.stringify(msg));
});

module.exports = home;