const express = require('express');
const home = express.Router();


home.get('/', (req, res) => {
  res.send('CS 422 - Project 1 - Team 4 - Time Lords');
});


home.post('/', (req, res) => {
  console.log(`${req.ip} connected to the server!`);
  const msg = {message: 'Connected to server!'};
  res.send(JSON.stringify(msg));
});


module.exports = home;