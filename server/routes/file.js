const express = require('express'); 
const file = express.Router();
const multer = require('multer') 
const mainAPI = require('../js_modules/mainAPI');

// Open a connection with main.py!
mainAPI.connectToMain();


// This provides the where and how the server will store the uploaded file.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/var/www/html/uploads/')
  },
  filename: function (req, file, cb) {
    // This is causing the weird uploaded file names.
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname + '-' + uniqueSuffix)
    // cb(null, user.username + '-' + ts.tsname) <- get user name and add to upload name from TS Description user input
  }
})

// Create instance of multer with the specific configuration defined above. 
const upload = multer({storage})


file.post('/', upload.single('uploaded_file'), function (req, res) {
  mainAPI.run().then(response => {
    response.forEach((element) => {
      console.log(element);
    });
  });

  // console.log(req.file, req.body)

  // Send a message back to the client. (should always be done with JSON).
  const msg = {message: '\'/file\' received your file!'};
  // put driver call here
  res.send(JSON.stringify(msg));
});

// Export file object for server.js to use.
module.exports = file;

