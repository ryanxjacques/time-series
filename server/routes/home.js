const express = require('express');
const home = express.Router();

home.get('/', (req, res) => {
  res.send('Hello World!');
});

home.post('/', (req, res) => {
  const data = JSON.parse(req.body);
  // Here you can do whatever you want with the received data
  
  console.log(data.message);
  res.send('Data received successfully!');
});

module.exports = home;