/* 
Author: Joseph
Python-shell docs: https://www.npmjs.com/package/python-shell
*/

/* -------------------------------------------------------------------------- */
/*                                  Preamble                                  */
/* -------------------------------------------------------------------------- */

// Import
const { PythonShell } = require('python-shell');

// This is the python file we will be communicating with.
const scriptPath = '/var/www/html/server/python_modules/encrypt.py';

// Some configurations.
const pyShellOptions = {
  mode: 'text',
  pythonOptions: ['-u'], // get print results in real-time
  args: [process.env.PEPPER]
};

// Construct a new pyshell object with defined configurations. 
const pyshell = new PythonShell(scriptPath, pyShellOptions);

/* -------------------------------------------------------------------------- */
/*                                  Main Body                                 */
/* -------------------------------------------------------------------------- */

const sendPythonMessage = (json_message) => {
  const promise = new Promise((resolve, reject) => {
    pyshell.send(json_message);
    pyshell.on('message', (json_response) => {
      // received a message sent from the Python script.
      const message = JSON.parse(json_response);
      if (message.name == "error") {
        reject(message.error);
      } else if (message.name == "hashed_password") {
        resolve(message.hashed_password)
      } else if (message.name == "access") {
        resolve(message.access);
      }
    });
  });
  return promise;
};

const hash_password = (password) => {
  const decoded_message = {op: "hash password", arg: password};
  const json_message = JSON.stringify(decoded_message);
  sendPythonMessage(json_message).then(response => {
    console.log(response);
  }).catch(err => {
    console.log(err);
  });
};

const verify_password = (password, hashed_password) => {
  const decoded_message = {op: "verify password", arg: [password, hashed_password]};
  const json_message = JSON.stringify(decoded_message);
  sendPythonMessage(json_message).then(response => {
    console.log(response);
  }).catch(err => {
    console.log(err);
  });
};

const end_script = () => {
  pyshell.end(function(err) {
    if (err) throw err;
    console.log('End Script');
  });
};

// Export for server.js to use.
module.exports = {
  sendPythonMessage,
  hash_password,
  verify_password,
  end_script
};