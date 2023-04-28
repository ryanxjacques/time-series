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
      try {
        const message = JSON.parse(json_response);
        resolve(message);
      } catch {
        reject(message);
      }
    });
  });
  return promise;
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
  end_script
};