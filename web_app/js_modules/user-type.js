/*
Team: Time Lords
Author(s): Joseph Erlinger
Description: Frontend JavaScript code for user-type choice page.
             Provides functions for animating elements & modifying font size.
Last Modified: 5/4/2023
*/

/* --------------------------------------------------------------------------- */
/* ---------------------------- Document Elements ---------------------------- */

const textInputs = document.querySelectorAll('.text-input');
const loginBtn = document.querySelector('.button-input');
const loginContainer = document.querySelector('.login-container');
const buttons = document.querySelectorAll('.text-input .button-input');

/* --------------------------------------------------------------------------- */
/* ------------------------------ Fetch Requests ----------------------------- */


// Login Request
loginBtn.addEventListener("click", (event) => {
  // There will only be at most one element with class= "checked".
  const checked = document.querySelector('.checked')


  // Do a litle jiggle if the user forgot to check an option.
  if (!checked) {
    failedLogin();
  } else {
    successfulLogin();
  }
});

/* --------------------------------------------------------------------------- */
/* ---------------------------- Font Size Control ---------------------------- */

const caclulateFontSize = () => {
  const height = window.getComputedStyle(loginContainer).getPropertyValue('height');
  const fontSize = parseFloat(height) * 0.05;
  for (let i = 0; i < textInputs.length; i++) {
    textInputs[i].style.fontSize = `${fontSize}px`;
  }
  loginBtn.style.fontSize = `${fontSize}px`;
}

window.addEventListener('resize', (event) => {
  caclulateFontSize();
});

window.onload = () => {
  caclulateFontSize();
};

/* ------------------------------------------------------------------------- */
/* --------------------------- Animation Control --------------------------- */


// Login Button Animations
textInputs[0].addEventListener("click", () => {
  if (textInputs[1].classList.contains('checked')) {
    textInputs[1].classList.add('backward-button-animation');
  }
  textInputs[0].classList.add('checked');
  textInputs[1].classList.remove('checked');
  textInputs[0].classList.remove('forward-button-animation');
  textInputs[0].classList.remove('backward-button-animation');
});

textInputs[0].addEventListener("mouseover", () => {
  if (!textInputs[0].classList.contains('checked')) {
    textInputs[0].classList.add('forward-button-animation');
    textInputs[0].classList.remove('backward-button-animation');
  }
});

textInputs[0].addEventListener("mouseout", () => {
  if (textInputs[0] !== document.activeElement
    && !textInputs[0].classList.contains('checked')) {
    textInputs[0].classList.add('backward-button-animation');
    textInputs[0].classList.remove('forward-button-animation');
  }
  // Smoother animation if invalid login. 
  textInputs[0].blur();
});

textInputs[0].addEventListener('focus', () => {
  if (!textInputs[0].classList.contains('checked')) {
    textInputs[0].classList.add('forward-button-animation');
    textInputs[0].classList.remove('backward-button-animation');
  }
});

textInputs[0].addEventListener('blur', () => {
  if (!textInputs[0].classList.contains('checked')) {
    textInputs[0].classList.add('backward-button-animation');
    textInputs[0].classList.remove('forward-button-animation');
  }
});

textInputs[0].addEventListener("animationend", (event) => {
  if (event.animationName === "hover-backwards") {
    textInputs[0].classList.remove('forward-button-animation');
    textInputs[0].classList.remove('backward-button-animation');
  }
});

textInputs[1].addEventListener("click", () => {
  if (textInputs[0].classList.contains('checked')) {
    textInputs[0].classList.add('backward-button-animation');
  }
  textInputs[1].classList.add('checked');
  textInputs[0].classList.remove('checked');
  textInputs[1].classList.remove('forward-button-animation');
  textInputs[1].classList.remove('backward-button-animation');
});

// Login Button Animations
textInputs[1].addEventListener("mouseover", () => {
  if (!textInputs[1].classList.contains('checked')) {
    textInputs[1].classList.add('forward-button-animation');
    textInputs[1].classList.remove('backward-button-animation');
  }
});

textInputs[1].addEventListener("mouseout", () => {
  if (textInputs[1] !== document.activeElement
    && !textInputs[1].classList.contains('checked')) {
    textInputs[1].classList.add('backward-button-animation');
    textInputs[1].classList.remove('forward-button-animation');
  }
  // Smoother animation if invalid login. 
  textInputs[1].blur();
});

textInputs[1].addEventListener('focus', () => {
  if (!textInputs[1].classList.contains('checked')) {
    textInputs[1].classList.add('forward-button-animation');
    textInputs[1].classList.remove('backward-button-animation');
  }
});

textInputs[1].addEventListener('blur', () => {
  if (!textInputs[1].classList.contains('checked')) {
    textInputs[1].classList.add('backward-button-animation');
    textInputs[1].classList.remove('forward-button-animation');
  }
});

textInputs[1].addEventListener("animationend", (event) => {
  if (event.animationName === "hover-backwards") {
    textInputs[1].classList.remove('forward-button-animation');
    textInputs[1].classList.remove('backward-button-animation');
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
  loginContainer.classList.add("slide-error-left");
}

loginContainer.addEventListener("animationend", (event) => {
  if (event.animationName === "slide-left") {
    window.location.replace("./home.html");
  }
  else if (event.animationName === "slide-from-right") {
    loginContainer.classList.remove('slide-from-right');
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