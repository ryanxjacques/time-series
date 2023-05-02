const jspyAPI = require('./jspyAPI');

const connectToMain = () => {
  // path to encrypt.py
  const scriptPath = '/var/www/html/server/python_modules/main.py';

  // some configurations.
  const pyShellOptions = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
  };

  // connect to main.py
  return pyshellMain = jspyAPI.connectToPython(scriptPath, pyShellOptions);
}


const endMain = () => {
    end_script(pyshellMain)
}