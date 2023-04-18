const express = require('express');
const home = express.Router();

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

home.get('/', (req, res) => {
  res.send('Hello, World!');
});

home.post('/', (req, res) => {
  const data = req.body;
  // Here you can do whatever you want with the received data
  console.log(data);
  const msg = {message: '/ recieved your message!'};
  res.send(JSON.stringify(msg));
});

home.put('/', upload.single('uploaded_file'), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any 
  console.log(req.file, req.body)
});


// home.put('/', upload.single('file'), function(req, res) {
//   console.log('recieved PUT request.');
//   res.send('File uploaded successfully');
// });

module.exports = home;