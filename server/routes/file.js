/* 
Address: https://35.85.29.142:3000/file

Title: File Upload Handler

Brief: An express.Router module that uses multer middleware to handle file
       uploads on the server-side in NodeJS.

Usage: Use a POST request from the client to upload files to the server.
*/


// The Web Application Framework.
const express = require('express'); 

// .Router provides a lighter-weigth express app.
const file = express.Router(); // < changes the relative root directory to file.

// Multer is middleware for handling file upload on the server-side in NodeJs.
const multer = require('multer') 

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
  /* 
  Brief: This function handles incomming POST requests to this module's address.

  Params:
    1. 'uploaded_file' is the name-value for the HTML file input tag.
    2. req: the data coming from the user.
    3. res: the data sent back to the user.

  Result:
    1. File sent from user is stored to the destination on the server specified 
       by the multer instance. 

  Note: The file upload action is done by the middleware function 'upload.single()'.
        The anonymous function tells the server what to do after uploading the file.
  */

  // Create a journalctl log indicating a successful file upload.
  console.log(req.file, req.body)

  // Send a message back to the client. (should always be done with JSON).
  const msg = {message: '\'/file\' received your file!'};
  // put driver call here
  res.send(JSON.stringify(msg));

});

// Export file object for server.js to use.
module.exports = file;

