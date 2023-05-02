
const express = require('express');
const uuidGen = express.Router();
const uuid = require('uuid');

uuidGen.get('/', (req, res) => {
  const client_id = uuid.v4();;

  const message = {id: client_id};
  res.send(JSON.stringify(message));
});

module.exports = uuidGen;