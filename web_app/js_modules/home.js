const signOutBtn = document.querySelector('#signout-btn');

signOutBtn.addEventListener("click", (event) => {
  const uuid = localStorage.getItem('uuid');
  sendRequest("POST", "https://35.85.29.142:3000/auth/logout", {uuid: uuid}).then(response => {
    if (response.status) {
      alert("signed out");
      return window.location.replace("../index.html");;
    }
  });
});