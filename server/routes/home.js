const express = require('express');
const home = express.Router();

home.get('/', (req, res) => {
  res.send('Hello, World!');
});

home.post('/', (req, res) => {
  const data = req.body;
  // Here you can do whatever you want with the received data
  console.log(data);
  const msg = {message: '\'/\' recieved your message!'};
  res.send(JSON.stringify(msg));
});

module.exports = home;