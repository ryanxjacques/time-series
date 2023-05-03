const express = require('express'); 
const file = express.Router();
const multer = require('multer') 
const mainAPI = require('../js_modules/mainAPI');

// Connect to data base.
const db = require('../js_modules/database');
const connection = db.connectToDataBase('users', 'file.js ');

// Open a connection with main.py!
mainAPI.connectToMain();

// This provides the where and how the server will store the uploaded file.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/var/www/html/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

// Create instance of multer with the specific configuration defined above. 
const upload = multer({storage})


file.post('/upload', upload.single('uploaded_file'), function (req, res) {
  const message = {message: "Succesfully uploaded file!"};
  res.send(JSON.stringify(message));
  mainAPI.run().then(response => {
    response.forEach((element) => {
      console.log(element);
    });
  });

  const msg = {message: '\'/file\' received your file!'};
  res.send(JSON.stringify(msg));
});

file.post('/metadata', (req, res) => {
  console.log(req.body);

  const { username } = req.body;

  console.log(username);
  // send user id.
  db.getRecordElement(connection, 'users', 'id', {username: username}).then(response => {
    const message = {id: response[0].id};
    res.send(JSON.stringify(message));
  });
});

// Export file object for server.js to use.
module.exports = file;

