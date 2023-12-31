/*
Team: Time Lords
Author(s): Joseph Erlinger

Title: Using the Fetch API

Brief: This module uses the Fetch API to send requests to the server. 
       The Fetch API uses promises under-the-hood, which allow for async code.

Note:   All data sent to the server should be JSON.
Except: File uploads sent using the FormData object.

Credit: I want to thank Mozilla for providing excellent documentation on how to use
the Fetch API. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

Last Modified: 5/3/2023
*/

// Get HTML document elements.
const fileInput = document.getElementById('file-input');
const submitFileForm = document.getElementById('submit-file-form');
const submitButton = document.getElementById('submit-file');

const uploadFile = async (url, fileInput, newFileName) => {
  // Extract name and file from fileInput document element.
  const selectedName = fileInput.getAttribute("name");
  const selectedFile = fileInput.files[0];

  // Add name and file to formData.
  const formData = new FormData();
  formData.append(selectedName, selectedFile, newFileName);
  try {
    // Send request and wait for a response.
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    // Return response for .then() to use.
    return response.json();
  } catch (error) {
    console.error("Error:", error);
  }
}

const sendRequest = async (method, url, data) => {
  try {
    // Send request and wait for a response.
    const response = await fetch(url, {
      method: method,
      credentials: 'include',
      headers: { //< Declare that we sending JSON data.
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    // Return response for .then() to use.
    return response.json();
  } catch (error) {
    console.error("Error:", error);
  }
}

const downloadFile = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    fetch(url, {
      method: method,
      credentials: 'include',
      headers: { //< Declare that we sending JSON data.
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    }).then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.csv'); // replace 'data.csv' with the actual filename
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        resolve(true);
      }).catch(error => {
        reject('Error: ' + error);
      });
  });
  return promise;
}


