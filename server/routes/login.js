const express = require('express');
const login = express.Router();

login.post('/login', (req, res) => {
  const data = req.body;
  // Here you can do whatever you want with the received data
  console.log(data);
  res.send('Data received successfully!');
});

module.exports = login;