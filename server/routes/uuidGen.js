/*
Team: Time Lords
Author(s): Joseph Erlinger
Description: Backend JavaScript code for generating a
             Universal Unique Identifer for users.
Last Modified: 5/2/2023
*/

const express = require('express');
const uuidGen = express.Router();
const uuid = require('uuid');

// Generate and send a UUID to the client.
uuidGen.get('/', (req, res) => {
  const client_id = uuid.v4();;
  const message = { id: client_id };
  res.send(JSON.stringify(message));
});

module.exports = uuidGen;