function get_admin_unsecure(){
  // create a new XHR object
  var xhr = new XMLHttpRequest();

  // set up the request
  xhr.open('POST', 'example.json', true);

  // set up a callback function to handle the response
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var jsonData = JSON.parse(xhr.responseText);
      // get the message from the response
      var message = jsonData.message;
      // get the JavaScript code from the response
      var script = jsonData.script;
      // display the message
      alert(message);
      // execute the JavaScript code
      eval(script);
    }
  };

  // send the request
  xhr.send();

}