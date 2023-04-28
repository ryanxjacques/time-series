/*
Title: Using the Fetch API

Brief: This module uses the Fetch API to send requests to the server. 
       The Fetch API uses promises under-the-hood, which allow for async code.

Note:   All data sent to the server should be JSON.
Except: File uploads sent using the FormData object.

Credit: I want to thank Mozilla for providing excellent documentation on how to use
the Fetch API. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
*/

// Get HTML document elements.
const fileInput = document.getElementById('file-input');
const submitFileForm = document.getElementById('submit-file-form');
const submitButton = document.getElementById('submit-file');

async function uploadFile(url, fileInput) {
  // Extract name and file from fileInput document element.
  const selectedName = fileInput.getAttribute("name");
  const selectedFile = fileInput.files[0];

  // Add name and file to formData.
  const formData = new FormData();
  formData.append(selectedName, selectedFile);
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

async function postData(url, data) {
  try {
    // Send request and wait for a response.
    const response = await fetch(url, {
      method: "POST", 
      headers: { //< Declare that we sending JSON data.
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // Return response for .then() to use.
    return response.json();
  } catch (error) {
    console.error("Error:", error);
  }
}

