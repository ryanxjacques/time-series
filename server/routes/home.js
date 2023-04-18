// <======= NEW STUFF =======>
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/') // specify the destination folder
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname) // use the original file name
  }
});

const upload = multer({ storage: storage });
// <======= END =======>

const express = require('express');
const home = express.Router();

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

home.put('/', upload.single('file'), function(req, res) {
  res.send('File uploaded successfully');
});

module.exports = home;