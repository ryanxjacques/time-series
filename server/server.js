/* 
   NodeJS Web Server!  (THIS MESSAGE IS OUTDATED)
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

// Require the javascript modules
// const db = require('./js_modules/database')

// Require the route modules
const home = require('./routes/home');
const auth = require('./routes/auth');
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
app.use('/auth', auth);
app.use('/file', file);

// >>>>>>>>>>> THIS IS FOR TESTING PURPOSES
// const test_password = "someFakePassword";
// user_auth.hash_password(test_password).then(response => {
//   console.log(`Input password: ${test_password}`)
//   console.log(`Hashed password: ${response}`);
//   user_auth.verify_password(test_password, response).then(response => {
//     console.log(`Authenticated: ${response}`);
//   })
// }).catch(err => {
//   console.log(err);
// });
// <<<<<<<<<<< THIS IS FOR TESTING PURPOSES

// Listen on port 3000 (default).
const port = process.env.PORT || 3000;
https.createServer(options, app)
.listen(port, function (req, res) {
  console.log(`Server started on ${port}`);
});

