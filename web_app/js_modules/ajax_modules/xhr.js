// credit: youtube channel Academind - "Sending JavaScript Http Requests with XMLHttpRequest".

const sendHttpRequest = (method, url, data) => {
  // promise allow for async code.
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.responseType = 'document';

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
    "email": "eve.holt@reqres.in",
    "password": "cityslicka"
})
  .then(responseData => {
    console.log(responseData)
  })
  .catch(err => {
    console.log(err);
  });
}

// Test submit.
getData('https://ec2-35-85-29-142.us-west-2.compute.amazonaws.com/');
