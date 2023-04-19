//Credit: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
async function upload(url, fileInput) {
  const selectedFile = fileInput.files[0];
  const formData = new FormData();
  formData.append("uploaded_file", selectedFile);
  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    // console.log("Success:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

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

const fileInput = document.getElementById('file-input');
const submitFileForm = document.getElementById('submit-file-form');
const submitButton = document.getElementById('submit-file');

submitButton.addEventListener("click", () => {
  upload('https://35.85.29.142:3000/file', fileInput).then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
  });
});



postData("https://35.85.29.142:3000/", { message: "Test: connect to / => PASSED" }).then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
});

postData("https://35.85.29.142:3000/login", { message: "Test: connect to /login => PASSED" }).then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
});
