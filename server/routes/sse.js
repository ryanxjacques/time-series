/* Server Side Events */

const express = require('express');
const sse = express.Router();


sse.get('/', (req, res) => {
  // Set headers to indicate SSE.
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  console.log(`IPV6: ${req.ip} connected to the server!`);

  // Listen for the client disconnecting.
  req.on('close', () => {
    console.log(`IPV6: ${req.ip} disconnected.`);
  });
});


module.exports = sse;