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

async function upload(url, formData) {
  try {
    const response = await fetch(url, {
      method: "PUT",
      body: formData,
    });
    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

const formData = new FormData();
const fileField = document.getElementById('logo-image');

formData.append("test", "abc123");
formData.append("avatar", fileField.files);

upload('https://35.85.29.142:3000/', formData);


postData("https://35.85.29.142:3000/", { message: "Test: connect to / => PASSED" }).then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
});

postData("https://35.85.29.142:3000/login", { message: "Test: connect to /login => PASSED" }).then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
});
