

module.exports = function(req, res) {
  const data = JSON.parse(req.body);
  // Here you can do whatever you want with the received data
  
  console.log(data.message);
  res.send('Data received successfully!');
};