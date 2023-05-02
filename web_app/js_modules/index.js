const submit = document.getElementById("submit-login-button");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", function() {
  const searchTerm = document.getElementById("search-input").value;
  window.location.href = "search.html?query=" + encodeURIComponent(searchTerm);
});

// Upload file when user clicks on submit button.
submitButton.addEventListener("click", () => {
  uploadFile('https://35.85.29.142:3000/file', fileInput).then((data) => {
    console.log(data.message); // JSON data parsed by `data.json()` call
  });
});


// Wait for the page to load.
const eventSource = new EventSource('https://35.85.29.142:3000/sse', { withCredentials: true });

eventSource.addEventListener('message', (event) => {
  try {
    const jsonString = JSON.parse(event.data);
    if (jsonString.message == "pending cookie") {
      console.log(jsonString.id);
      document.cookie = `SessionId=${jsonString.cookie}; sameSite=None; path=/; secure=True`;
      setTimeout(function() {
        getCookie(jsonString.id).then(response => {
          console.log(response);
        });
      }, 500); // wait a half second before requesting a cookie
    } else {
      console.log(jsonString.message);
    }
  } catch {
    console.log(`Received message: ${event.data}`);
  }
});

