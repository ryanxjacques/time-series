/* Server Side Events */
const express = require('express');
const sse = express.Router();
const db = require('../js_modules/database');
const connection = db.connectToDataBase('users', 'sse.js ');
const crypto = require('crypto');

// Reset the active user's table so that it is empty when the server is booted up.
db.truncateTable(connection, 'active_users');

// Reset any pending cookies.
const PENDING_COOKIES = new Object();

sse.get('/', (req, res) => {
  // Set headers to indicate SSE.
  res.writeHead(200, {
    'Content-Type': 'text/event-stream', // We are not explicitly sending JSON data here!
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  const client_id = String(Date.now()) + String(Math.random());
  console.log(`Client ID: ${client_id} connected to the server!.`);
  // create a SHA256 hash object
  const hash = crypto.createHash('sha256');

  // update the hash object with the string to be hashed
  hash.update(client_id);

  // generate the hash digest
  const digest = hash.digest('hex'); // returns a hexadecimal string representation of the digest

  PENDING_COOKIES[client_id] = digest;
  const message = {message: "pending cookie", id: client_id};
  res.write(`data: ${JSON.stringify(message)}\n\n`);


  db.insertRecord(connection, 'active_users', {client_id: client_id}).then(() => {
    const message = {message: "You were added to the active users!"};
    res.write(`data: ${JSON.stringify(message)}\n\n`);
  });

  // Listen for the client disconnecting.
  req.on('close', () => {
    db.deleteRecord(connection, 'active_users', {client_id: client_id}).then(() => {
      console.log(`Client ID: ${client_id} disconnected.`);
    })
  });
});

module.exports = {
  sse, 
  PENDING_COOKIES
};