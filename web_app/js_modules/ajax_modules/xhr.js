// credit: youtube channel Academind - "Sending JavaScript Http Requests with XMLHttpRequest".

const sentHttpRequest = (method, url, data) => {
  // promise allows for async code.
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
  sentHttpRequest('GET', url).then(responseData => {
    console.log(responseData);
  });
}

// Test submit.
getData('./example.json');