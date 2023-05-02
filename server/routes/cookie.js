const express = require('express');
const oven = express.Router();
const cookieParser = require('cookie-parser');
const {PENDING_COOKIES} = require('./sse');
oven.use(cookieParser());

oven.post('/set-cookie', (req, res) => {
  const { id } = req.body;

  const sessionId = PENDING_COOKIES[id]
  delete PENDING_COOKIES[id];
  res.cookie('sessionId', sessionId, {
    path: '/',
    sameSite: 'None',
    secure: true
  });

  const msg = {message: "Cookie has been set!"};
  res.send(JSON.stringify(msg));
});


oven.post('/read-cookie', (req, res) => {
  console.log(req.cookies);
  const sessionId = req.cookies.sessionId;
  console.log('Client sent us this cookie: '+sessionId);
});

module.exports = oven;