const fileInput = document.getElementById('myFile'); // get the input element for the file

fileInput.addEventListener('change', function() {
  const file = fileInput.files[0]; // get the selected file
  const url = 'https://35.85.29.142:3000/'; // set the URL for the PUT request

  fetch(url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type // set the content type header to the file type
    }
  })
  .then(response => {
    if (response.ok) {
      console.log('File uploaded successfully'); // handle the response from the server
    } else {
      throw new Error('Network response was not ok.');
    }
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
});

//Credit: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

async function postData(url, data) {
  const response = await fetch(url, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

// async function upload(url, formData) {
//   try {
//     const response = await fetch(url, {
//       method: "PUT",
//       body: formData,
//     });
//     const result = await response.json();
//     console.log("Success:", result);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// const formData = new FormData();
// const fileField = document.getElementById('logo-image');

// formData.append("test", "abc123");
// formData.append("avatar", fileField.files);

// upload('https://35.85.29.142:3000/', formData);


postData("https://35.85.29.142:3000/", { message: "Test: connect to / => PASSED" }).then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
});

postData("https://35.85.29.142:3000/login", { message: "Test: connect to /login => PASSED" }).then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
});
