// Requiring in-built https for creating
// https server
const https = require("https");

const express = require('express');
const app = express();

// Requiring file system to use local files
const fs = require("fs");

const bodyParser = require("body-parser");
// Configuring express to use body-parser
// as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const options = {
  key: fs.readFileSync("etc/pki/tls/certs/custom.key"),
  cert: fs.readFileSync("etc/pki/tls/certs/localhost.crt"),
};

const port = process.env.PORT || 3000;
https.createServer(options, app)
.listen(port, function (req, res) {
  console.log(`Server started on ${port}`);
});
