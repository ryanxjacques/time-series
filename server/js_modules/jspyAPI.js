/*
Team: Time Lords
Author: Joseph Erlinger
Description: Backend JavaScript module for connecting JS & Python.
Python-shell docs: https://www.npmjs.com/package/python-shell
Last Modified: 5/1/2023
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
  return new PythonShell(scriptPath, pyShellOptions);
}

const sendPythonMessage = (pyshell, json_message) => {
  const promise = new Promise((resolve, reject) => {
    pyshell.send(json_message);
    pyshell.on('message', (json_response) => {
      try {
        const message = JSON.parse(json_response);
        resolve(message);
      } catch {
        reject(json_response);
      }
    });
  });
  return promise;
};

const end_script = (pyshell) => {
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
  end_script
};