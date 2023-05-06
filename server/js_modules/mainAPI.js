/*
Team: Time Lords
Author(s): Joseph Erlinger, Ryan Jacques
Description: Backend JavaScript module for connecting to and running main.py.
Last Modified: 5/1/2023
*/
const jspyAPI = require('./jspyAPI');

const connectToMain = () => {
  // path to encrypt.py
  const scriptPath = '/var/www/html/server/python_modules/main.py';

  // some configurations.
  const pyShellOptions = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
  };

  // connect to encrypt.py
  return pyshellMain = jspyAPI.connectToPython(scriptPath, pyShellOptions);
}

const mainAPI = (jsObject) => {
  const jsonObject = JSON.stringify(jsObject);
  const promise = new Promise((resolve, reject) => {
    jspyAPI.sendPythonMessage(pyshellMain, jsonObject).then((response) => {
      // Define the JSON protocal here for encryptAPI.
      if (response.name == "error") {
        reject(response.error);
      } else if (response.name == "success") {
        resolve(response.success)
      }
    });
  }).catch((err => {
    if (err) throw err;
  }));
  return promise;
};

const run = (password) => {
  /* It is the user's responsibility to specify what to do when the promise is resolved */
  const jsObject = { update: true };
  return mainAPI(jsObject);  //< Promise
};


module.exports = {
  connectToMain,
  run,
};