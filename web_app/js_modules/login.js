const username = document.querySelector('#login-username');
const password = document.querySelector('#login-password');
const loginBtn = document.querySelector('#login-btn');

loginBtn.addEventListener("click", (event) => {
  let missingData = false;
  if (!username.value) {
    missingData = true;
    invalid_empty_input(username);
  }
  if (!password.value) {
    missingData = true;
    invalid_empty_input(password);
  }

  if(!missingData) {
    message = {'username': username.value, 'password': password.value};
    sendRequest("POST", "https://35.85.29.142:3000/auth/login", message).then((data) => {
      alert(data.message);
      if (data.status) {
        return window.location.replace("../index.html");
      }
    });
  }
});

const invalid_empty_input = (element) => {
  const placeholder = element.getAttribute('placeholder');
  element.setCustomValidity('This field is required.');
  if (!placeholder.endsWith('*')) {
    element.setAttribute('placeholder', `${placeholder}*`);
  }
};