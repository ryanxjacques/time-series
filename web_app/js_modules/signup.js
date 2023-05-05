/*
Team: Time Lords
Author(s): Joseph Erlinger
Description: Frontend JavaScript code for sign-up page.
             Provides functions for authenticating user info,
             animating elements, & modifying font size.
Last Modified: 5/4/2023
*/

/* --------------------------------------------------------------------------- */
/* ---------------------------- Document Elements ---------------------------- */

const textInputs = document.querySelectorAll('.text-input');
const textLabels = document.querySelectorAll('.text-input-label');
const loginBtn = document.querySelector('.button-input');
const loginContainer = document.querySelector('.login-container');
const registerLink = document.querySelector('#register-link');

/* --------------------------------------------------------------------------- */
/* ------------------------------ Fetch Requests ----------------------------- */


// Login Request
loginBtn.addEventListener("click", (event) => {
  // Default
  let missingData = false;

  // Aliases
  const usernameContainer = textInputs[0];
  const passwordPassword = textInputs[1];
  const username = textInputs[0].value;
  const password = textInputs[1].value;
  const usernameLabel = textLabels[0];
  const passwordLabel = textLabels[1];

  // Check for missing username
  if (!username) {
    missingData = true;
    invalid_empty_input(usernameContainer, usernameLabel);
  } else {
    valid_input(usernameContainer, usernameLabel);
  }

  // Check for missing password
  if (!password) {
    missingData = true;
    invalid_empty_input(passwordPassword, passwordLabel);
  } else {
    valid_input(passwordPassword, passwordLabel);
  }

  if (!missingData) {
    message = { 'username': username, 'password': password, 'uuid': localStorage.getItem('uuid') };
    sendRequest("POST", "https://35.85.29.142:3000/auth/signup", message).then((data) => {
      if (data.status) {
        localStorage.setItem('username', username);
        successfulLogin();
      } else {
        failedLogin();
        invalid_empty_input(passwordPassword, passwordLabel);
        invalid_empty_input(usernameContainer, usernameLabel);
      }
    });
  }
});

const invalid_empty_input = (container, text) => {
  container.classList.add('invalid-input-container');
  text.classList.add('invalid-input-text');
};

const valid_input = (container, text) => {
  container.classList.remove('invalid-input-container');
  text.classList.remove('invalid-input-text');
}

/* --------------------------------------------------------------------------- */
/* ---------------------------- Font Size Control ---------------------------- */

const caclulateFontSize = () => {
  const height = window.getComputedStyle(textInputs[0]).getPropertyValue('height');
  const fontSize = parseFloat(height) * 0.30;
  for (let i = 0; i < textInputs.length; i++) {
    textLabels[i].style.fontSize = `${fontSize}px`;
    textInputs[i].style.fontSize = `${fontSize}px`;
  }
  loginBtn.style.fontSize = `${fontSize}px`;
}

const calculateLabelOffset = () => {
  const xPos = textInputs[0].offsetLeft;
  for (let i = 0; i < textLabels.length; i++) {
    // equation is: text-input.left + text-input.padding-left.
    textLabels[i].style.left = `${xPos + 40}px`
  }
}

window.addEventListener('resize', (event) => {
  caclulateFontSize();
  calculateLabelOffset();
});

window.onload = () => {
  caclulateFontSize();
  calculateLabelOffset();
};

/* ------------------------------------------------------------------------- */
/* --------------------------- Animation Control --------------------------- */

// Username Animations
textInputs[0].addEventListener('focus', () => {
  textLabels[0].textContent = 'username';
  textLabels[0].classList.add('forward-label-animation');
  textLabels[0].classList.remove('backward-label-animation');
});

textInputs[0].addEventListener('blur', () => {
  if (!textInputs[0].value) {
    textLabels[0].classList.add('backward-label-animation');
    textLabels[0].classList.remove('forward-label-animation');
  }
});

textLabels[0].addEventListener("animationend", (event) => {
  if (event.animationName === "move-backwards") {
    textLabels[0].classList.remove('backward-label-animation');
    textLabels[0].classList.remove('forward-label-animation');
  }
});

// Password Animations
textInputs[1].addEventListener('focus', () => {
  textLabels[1].classList.add('forward-label-animation');
  textLabels[1].classList.remove('backward-label-animation');
});
textInputs[1].addEventListener('blur', () => {
  if (!textInputs[1].value) {
    textLabels[1].classList.add('backward-label-animation');
    textLabels[1].classList.remove('forward-label-animation');
  }
});
textLabels[1].addEventListener("animationend", (event) => {
  if (event.animationName === "move-backwards") {
    textLabels[1].classList.remove('backward-label-animation');
    textLabels[1].classList.remove('forward-label-animation');
  }
});

// Login Button Animations
loginBtn.addEventListener("mouseover", () => {
  loginBtn.classList.add('forward-button-animation');
  loginBtn.classList.remove('backward-button-animation');
});

loginBtn.addEventListener("mouseout", () => {
  if (loginBtn !== document.activeElement) {
    loginBtn.classList.add('backward-button-animation');
    loginBtn.classList.remove('forward-button-animation');
  }
  // Smoother animation if invalid login. 
  loginBtn.blur();
});

loginBtn.addEventListener('focus', () => {
  loginBtn.classList.add('forward-button-animation');
  loginBtn.classList.remove('backward-button-animation');
});

loginBtn.addEventListener('blur', () => {
  loginBtn.classList.add('backward-button-animation');
  loginBtn.classList.remove('forward-button-animation');
});

loginBtn.addEventListener("animationend", (event) => {
  if (event.animationName === "hover-backwards") {
    loginBtn.classList.remove('forward-button-animation');
    loginBtn.classList.remove('backward-button-animation');
  }
});

// Login Container Animations
const successfulLogin = () => {
  loginContainer.classList.add('slide-left');
  loginBtn.classList.add('forward-button-animation');
  loginBtn.classList.remove('backward-button-animation');
  loginBtn.style.cursor = "default";
  loginBtn.style.outline = "none";
}

const failedLogin = () => {
  // This starts the sequence.
  loginContainer.classList.add('slide-error-left');
  // Delete username and password from text-input.
  textInputs[0].value = '';
  textInputs[1].value = '';
  textLabels[0].textContent = 'username taken';
  textLabels[0].classList.remove('forward-label-animation');
  textLabels[0].classList.add('backward-label-animation');
  textLabels[1].classList.remove('forward-label-animation');
  textLabels[1].classList.add('backward-label-animation');
  textInputs[0].blur();
  textInputs[1].blur();
}

registerLink.addEventListener("click", () => {
  loginContainer.classList.add('slide-right');
  registerLink.style.cursor = "default";
});

registerLink.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) { // 13 is the code for the "Enter" key
    loginContainer.classList.add('slide-right');
    registerLink.style.outline = "none";
    registerLink.style.cursor = "default";
  }
});

loginContainer.addEventListener("animationend", (event) => {
  if (event.animationName === "slide-left") {
    window.location.replace("./user-type.html");
  }
  else if (event.animationName === "slide-right") {
    window.location.replace("../index.html");
  }
  else if (event.animationName === "slide-from-left") {
    loginContainer.classList.remove('slide-from-left');
  }
  // Error animation sequence
  else if (event.animationName === "slide-error-left") {
    loginContainer.classList.remove('slide-error-left');
    loginContainer.classList.add('slide-error-right');
  }
  else if (event.animationName === "slide-error-right") {
    loginContainer.classList.remove('slide-error-right');
    loginContainer.classList.add('slide-error-center');
  }
  else if (event.animationName === "slide-error-center") {
    loginContainer.classList.remove('slide-error-center');
  }
});