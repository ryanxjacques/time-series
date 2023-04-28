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