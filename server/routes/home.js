const express = require('express');
const home = express.Router();

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile, getFileStream } = require('./s3')

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

home.put('/', upload.single('image'), async (req, res) => {
  const file = req.file
  console.log(file)

  // apply filter
  // resize 

  const result = await uploadFile(file)
  await unlinkFile(file.path)
  console.log(result)
  const description = req.body.description
  res.send({imagePath: `/images/${result.Key}`})
})


// home.put('/', upload.single('file'), function(req, res) {
//   console.log('recieved PUT request.');
//   res.send('File uploaded successfully');
// });

module.exports = home;