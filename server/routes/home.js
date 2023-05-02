const express = require('express');
const home = express.Router();


home.get('/', (req, res) => {
  res.send('CS 422 - Project 1 - Team 4 - Time Lords');
});


home.post('/', (req, res) => {
  const msg = {message: 'We received your message at https://35.85.29.142:3000/'};
  res.send(JSON.stringify(msg));
});


module.exports = home;