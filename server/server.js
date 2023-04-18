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
const home = require('./routes/home')
const login = require('./routes/login')

// Connect to MySQL database
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
    console.log(result[0].username);
    console.log(fields);
});

// connection.end(() => {
//   console.log('Disconnected to MySQL server.')
// });

// Register the routes with Express
app.get('/', home.get);
app.post('/', home.post);
app.post('/login', login.post);

/* ------------------------------------------- */
/* HTTPS Protocol for web traffic on port 3000 */
/* ------------------------------------------- */
// Require NodeJS to be an HTTPS server.
const https = require("https");

// Whitelist the Web App's url.
const cors = require('cors');
app.use(cors());
app.use(cors({
  origin: 'https://pages.uoregon.edu'
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

// Listen on port 3000 (default).
const port = process.env.PORT || 3000;
https.createServer(options, app)
.listen(port, function (req, res) {
  console.log(`Server started on ${port}`);
});

