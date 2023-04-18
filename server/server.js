// Requiring in-built https for creating
// https server
const https = require("https");

// Connect to MySQL database
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'cs-422-project-1.ckfbnqxojtz2.us-west-2.rds.amazonaws.com',
  port: '3306',
  user: 'admin',
  password: 'uS+Xzgy9UZK7%FVp', // this is a bad idea.
  database: 'users'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected to MySQL server!');
});

connection.query("SELECT username, password FROM users WHERE id=0", function (err, result, fields) {
    console.log(result);
    console.log(result[0]);
    console.log(fields);
});

connection.end(() => {
  console.log('Disconnected to MySQL server.')
});


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
  const data = JSON.parse(req.body);
  // Here you can do whatever you want with the received data
  
  console.log(data.message);
  res.send('Data received successfully!');
});

const options = {
  key: fs.readFileSync("/var/www/html/server.key"),
  cert: fs.readFileSync("/var/www/html/server.cert"),
};

const port = process.env.PORT || 3000;
https.createServer(options, app)
.listen(port, function (req, res) {
  console.log(`Server started on ${port}`);
});