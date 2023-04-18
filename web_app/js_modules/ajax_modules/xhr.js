// credit: youtube channel Academind - "Sending JavaScript Http Requests with XMLHttpRequest".

const sendHttpRequest = (method, url, data) => {
  // promise allow for async code.
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.responseType = 'json';

    if (data) {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    }

    xhr.onerror = () => {
      reject("Something went wrong!")
    }

    xhr.send(JSON.stringify(data));
  });
  // to use the promise we need to return it.
  return promise;
}

const getData = (url) => {
  // the .then makes this function async.
  sendHttpRequest('GET', url).then(responseData => {
    console.log(responseData);
  });
}

const sendData = (url) => {
  sendHttpRequest('POST', url, {
    "message": "Hello, world!"
})
  .then(responseData => {
    console.log(responseData)
  })
  .catch(err => {
    console.log(err);
  });
}

// Test submit.
// getData('https://35.85.29.142:3000/');
sendData('https://35.85.29.142:3000/api/user');
