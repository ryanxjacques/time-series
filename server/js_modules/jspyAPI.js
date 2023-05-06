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

// Create a new connection to a python file.
const connectToPython = (scriptPath, pyShellOptions) => {
  return new PythonShell(scriptPath, pyShellOptions);
}

// Send a message to the connected python file through stdin.
const sendPythonMessage = (pyshell, json_message) => {
  const promise = new Promise((resolve, reject) => {
    pyshell.send(json_message);
    // When the python file outputs to stdout (i.e print statment), this runs.
    pyshell.on('message', (json_response) => {
      // All print statements in the python files should ONLY output JSON.
      try {
        // It is up to the APIs that connect to a python file to make a protocal
        // for handling JSON messages.
        const message = JSON.parse(json_response);
        resolve(message);
      } catch {
        reject(json_response);
      }
    });
  });
  return promise;
};

// End connection to the python file.
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