const express = require('express');
const login = express.Router();

login.post('/', (req, res) => {
  const data = req.body;
  // Here you can do whatever you want with the received data
  console.log(data);
  const msg = {message: '\'/auth\' recieved your message!'};
  res.send(JSON.stringify(msg));
});

login.post('/login', (req, res) => {
  const data = req.body;
  // Here you can do whatever you want with the received data
  console.log(data);
  const msg = {message: '\'/auth/login\' recieved your message!'};
  res.send(JSON.stringify(msg));
});

login.post('/signin', (req, res) => {
  const data = req.body;
  // Here you can do whatever you want with the received data
  console.log(data);
  const msg = {message: '\'/auth/signin\' recieved your message!'};
  res.send(JSON.stringify(msg));
});

module.exports = login;