const submit = document.getElementById("submit-login-button");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", function() {
  const searchValue = document.getElementById("search-input").value;
  window.location.href = "search-results.php?query=" + encodeURIComponent(searchValue);
});

// Upload file when user clicks on submit button.
submitButton.addEventListener("click", () => {
  uploadFile('https://35.85.29.142:3000/file', fileInput).then((data) => {
    console.log(data.message); // JSON data parsed by `data.json()` call
  });
});

postData('https://35.85.29.142:3000/', {message: "client connected to 35.85.29.142:3000/"}).then((response => {
  console.log(response.message);
}))

// Recieve Server Side Event (messages).
const eventSource = new EventSource('https://35.85.29.142:3000/sse');

eventSource.addEventListener('message', (event) => {
  console.log(event.data);
});

eventSource.addEventListener('open', () => {
  console.log('Connected to server');
});

eventSource.addEventListener('error', () => {
  console.log('Error connecting to server');
});