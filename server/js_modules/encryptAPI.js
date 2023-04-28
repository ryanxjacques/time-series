const jspyAPI = require('./jspyAPI');


const connectToEncrypt = () => {
  // path to encrypt.py
  const scriptPath = '/var/www/html/server/python_modules/encrypt.py';

  // some configurations.
  const pyShellOptions = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
    args: [process.env.PEPPER]
  };

  // connect to encrypt.py
  return jspyAPI.connectToPython(scriptPath, pyShellOptions);
}


const encryptAPI = (jsObject) => {
  const jsonObject = JSON.stringify(jsObject);
  const promise = new Promise((resolve, reject) => {
    jspyAPI.sendPythonMessage(jsonObject).then((response) => {
      // Define the JSON protocal here for encryptAPI.
      if (response.name == "error") {
        reject(response.error);
      } else if (response.name == "hashed_password") {
        resolve(response.hashed_password)
      } else if (response.name == "access") {
        resolve(response.access);
      }
    });
  }).catch((err => {
    if (err) throw err;
  }));
  return promise;
};

const hash_password = (password) => {
  /* It is the user's responsibility to specify what to do when the promise is resolved */
  const jsObject = {op: "hash password", arg: password};
  return encryptAPI(jsObject);  //< Promise
};

const verify_password = (password, hashed_password) => {
  /* It is the user's responsibility to specify what to do when the promise is resolved */
  const jsObject = {op: "verify password", arg: [password, hashed_password]};
  return encryptAPI(jsObject);  //< Promise
};


module.exports = {
  connectToEncrypt,
  hash_password,
  verify_password
};