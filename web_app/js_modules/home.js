/*
Team: Time Lords
Author(s): Joseph Erlinger, Sterling Stewart
Description: Frontend JavaScript code for home page.
             Provides functions for sign-out & search buttons.
Last Modified: 5/2/2023
*/

const signOutBtn = document.querySelector('#signout-btn');
const searchButton = document.getElementById("search-button");

signOutBtn.addEventListener("click", (event) => {
  const uuid = localStorage.getItem('uuid');
  sendRequest("POST", "https://35.85.29.142:3000/auth/logout", { uuid: uuid }).then(response => {
    if (response.status) {
      alert("signed out");
      return window.location.replace("../index.html");;
    }
  });
});

searchButton.addEventListener("click", function () {
  const searchTerm = document.getElementById("search-input").value;
  window.location.href = "search.html?query=" + encodeURIComponent(searchTerm);
});