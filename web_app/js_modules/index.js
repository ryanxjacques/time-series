// const submit = document.getElementById("submit-login-button");
// const searchButton = document.getElementById("search-button");

// searchButton.addEventListener("click", function() {
//   const searchTerm = document.getElementById("search-input").value;
//   window.location.href = "search.html?query=" + encodeURIComponent(searchTerm);
// });

// // Upload file when user clicks on submit button.
// submitButton.addEventListener("click", () => {
//   uploadFile('https://35.85.29.142:3000/file', fileInput).then((data) => {
//     console.log(data.message); // JSON data parsed by `data.json()` call
//   });
// });

const uuid = localStorage.getItem('uuid')

const getUuid = () => {
  sendRequest('GET', 'https://35.85.29.142:3000/uuidGen/').then(response => {
    localStorage.setItem('uuid', response.id);
  });
}

const checkActive = (uuid) => {
  sendRequest('POST', 'https://35.85.29.142:3000/auth/is-active?', {uuid: uuid}).then(response => {
    if (response.status) {
      return window.location.replace("pages/home.html");;
    }
  });
}

const main = () => {
  if (uuid) {
    checkActive(uuid);
  } else {
    getUuid();
  }
};

// Execute main
main();
