/* NodeJS Web Server! 
   ------------------
   Dependencies:   
     Node Modules ... 
       1. express
       2. mysql
       3. https
       4. cors
       5. fs
       6. body-parser
     Routes Modules ... 
       1. home
       2. login
*/

// Express Dependency
const express = require('express');
const app = express();

// MySQL Dependency
const mysql = require('mysql');

// Require the route modules
const home = require('./routes/home');
const login = require('./routes/login');
const file = require('./routes/file');

/* -------------------------------------------------------------------------- */
/*                       HTTPS Protocol for web traffic                       */
/* -------------------------------------------------------------------------- */
// Require NodeJS to be an HTTPS server.
const https = require("https");

// Whitelist the Web App's url.
const cors = require('cors');
app.use(cors({
  origin: 'https://pages.uoregon.edu',
}));

// Requiring file system to use local files
const fs = require("fs");
const bodyParser = require("body-parser");

// Configuring express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Necessary HTTPS Key and Certificate 
const options = {
  key: fs.readFileSync("/var/www/html/server.key"),
  cert: fs.readFileSync("/var/www/html/server.cert"),
};

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */
// Register the routes with Express
app.use('/', home);
app.use('/login', login);
app.use('/file', file);

// >>>>>>>>>>> THIS WILL MOVE TO A DIFFERENT MODULE LATER
// Connect to MySQL database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: 'users'
});

console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS, process.env.DB_PORT,);

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected to MySQL server!');
});

connection.query("SELECT username, password FROM users WHERE id=1", function (err, result, fields) {
  // results: <list> the results from the query.
  console.log(`username: ${result[0].username} password ${result[0].password}`);
});

connection.end(() => {
  console.log('Disconnected to MySQL server.')
});
// <<<<<<<<<<< THIS WILL MOVE TO A DIFFERENT MODULE LATER

// Listen on port 3000 (default).
const port = process.env.PORT || 3000;
https.createServer(options, app)
.listen(port, function (req, res) {
  console.log(`Server started on ${port}`);
});

