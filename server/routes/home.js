const express = require('express');
const home = express.Router();

// <======= NEW STUFF =======>
const multer = require('multer');

const imageStorage = multer.diskStorage({
  // Destination to store image     
  destination: 'images', 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() 
           + path.extname(file.originalname))
          // file.fieldname is name of the field (image)
          // path.extname get the uploaded file extension
  }
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000 // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) { 
       // upload only png and jpg format
       return cb(new Error('Please upload a Image'))
     }
   cb(undefined, true)
}
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/') // specify the destination folder
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname) // use the original file name
  }
});

const upload = multer({ storage: storage });
// <======= END =======>


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

// For Single image upload
home.put('/', imageUpload.single('image'), (req, res) => {
  res.send(req.file)
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
});

// home.put('/', upload.single('file'), function(req, res) {
//   console.log('recieved PUT request.');
//   res.send('File uploaded successfully');
// });

module.exports = home;