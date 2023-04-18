// Requiring in-built https for creating
// https server
const https = require("https");

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

// Allow requests comming from pages.uoregon.edu.
app.use(cors({
  origin: 'https://pages.uoregon.edu'
}));

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



app.post('/', (req, res) => {
  const data = req.body;
  // Here you can do whatever you want with the received data
  console.log(data);
  res.send('Data received successfully!');
});

app.post('/login', (req, res) => {
  const data = req.body;
  // Here you can do whatever you want with the received data
  console.log(data);
  res.send('Data received successfully!');
});

const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert"),
};

const port = process.env.PORT || 3000;
https.createServer(options, app)
.listen(port, function (req, res) {
  console.log(`Server started on ${port}`);
});