/* 
Author: Joseph
Python-shell docs: https://www.npmjs.com/package/python-shell
*/

/* -------------------------------------------------------------------------- */
/*                                  Preamble                                  */
/* -------------------------------------------------------------------------- */

// Import
const { PythonShell } = require('python-shell');


/* -------------------------------------------------------------------------- */
/*                                  Main Body                                 */
/* -------------------------------------------------------------------------- */

const connectToPython = (scriptPath, pyShellOptions) => {
  return pyshell = new PythonShell(scriptPath, pyShellOptions);
}

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
  /* It is the user's responsibility to specify what to do when the promise is resolved */
  const decoded_message = {op: "hash password", arg: password};
  const json_message = JSON.stringify(decoded_message);
  return sendPythonMessage(json_message);  //< Promise
};

const verify_password = (password, hashed_password) => {
  /* It is the user's responsibility to specify what to do when the promise is resolved */
  const decoded_message = {op: "verify password", arg: [password, hashed_password]};
  const json_message = JSON.stringify(decoded_message);
  return sendPythonMessage(json_message);  //< Promise
};

const end_script = () => {
  pyshell.end(function(err) {
    if (err) throw err;
    console.log('End Script');
  });
};

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */

// Specify functions ready for export.
module.exports = {
  connectToPython,
  sendPythonMessage,
  hash_password,
  verify_password,
  end_script
};