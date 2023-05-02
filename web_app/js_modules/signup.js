const username = document.querySelector('#signup-username');
const password = document.querySelector('#signup-password');
const email = document.querySelector('#signup-email');
const signupBtn = document.querySelector('#signup-btn');

signupBtn.addEventListener("click", (event) => {
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
    message = {'username': username.value, 'password': password.value, 'uuid': localStorage.getItem('uuid')};
    sendRequest("POST", "https://35.85.29.142:3000/auth/signup", message).then((data) => {
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