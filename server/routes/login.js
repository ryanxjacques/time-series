const express = require('express');
const login = express.Router();

login.post('/', (req, res) => {
  const data = req.body;
  // Here you can do whatever you want with the received data
  console.log(data);
  const msg = {message: 'Data received successfully!'};
  res.send(JSON.stringify(msg));
});

module.exports = login;