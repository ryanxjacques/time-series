/*
Team: Time Lords
Author(s): Joseph Erlinger, Sterling Stewart
Description: Frontend JavaScript code for home page.
             Provides functions for sign-out & search buttons.
Last Modified: 5/2/2023
*/

/* --------------------------------------------------------------------------- */
/* ---------------------------- Document Elements ---------------------------- */

const teamNameContainer = document.querySelector('.team-name-container');
const accountContainer = document.querySelector('.account-container');
const uploadContainer = document.querySelector('.upload-container');
const browseContainer = document.querySelector('.browse-container');
const containers = document.querySelectorAll('.team-name-container, .account-container, .upload-container, .browse-container');
const smallText = document.querySelectorAll('.team-name-container, .account-container');
const bigText = document.querySelectorAll('.upload-container, .browse-container');
const buttons = document.querySelectorAll('.user, .signout-button, .redirect-to-upload, .redirect-to-browse');
const redirectButtons = document.querySelectorAll('.signout-button, .redirect-to-upload, .redirect-to-browse');
const userBtn = document.querySelector('.user');
const signoutBtn = document.querySelector('.signout-button');
const uploadRedirectBtn = document.querySelector('.redirect-to-upload');
const browseRedirectBtn = document.querySelector('.redirect-to-browse');
let checked;


// Button Animations
buttons.forEach((button) => {
  button.addEventListener("mouseover", () => {
    button.classList.add('forward-button-animation');
    button.classList.remove('backward-button-animation');
  });

  button.addEventListener("mouseout", () => {
    if (button !== document.activeElement) {
      button.classList.add('backward-button-animation');
      button.classList.remove('forward-button-animation');
    }
    // Smoother animation if invalid login. 
    button.blur();
  });

  button.addEventListener('focus', () => {
    button.classList.add('forward-button-animation');
    button.classList.remove('backward-button-animation');
  });

  button.addEventListener('blur', () => {
    button.classList.add('backward-button-animation');
    button.classList.remove('forward-button-animation');
  });

  button.addEventListener("animationend", () => {
    if (button.animationName === "hover-backwards") {
      button.classList.remove('forward-button-animation');
      button.classList.remove('backward-button-animation');
    }
  });
});


const height = window.innerHeight;
const fontSize = height * 0.04;
bigText.forEach(text => {
  console.log(fontSize);
  text.style.fontSize = `${fontSize}px`;
})

// Animations for redirect buttons
redirectButtons.forEach((reBtn) => {
  reBtn.addEventListener("click", () => {
    checked = reBtn.className.split(' ')[0]
    reBtn.classList.add('checked');
    partyOver();
  });
});


// use the browse container to check which button was clicked because its the slowest.
browseContainer.addEventListener("animationend", (event) => {
  if (event.animationName === 'slide-to-left') {
    if (checked === 'signout-button') {
      window.location.replace("../index.html");
    } else if (checked === 'redirect-to-upload') {
      window.location.replace("./file-upload.html");
    } else if (checked === 'redirect-to-browse') {
      window.location.replace("./browse.html");;
    } else {
      alert(`error: ${checked}`)
    }
  }
});



// Display the sign out button when the user button is pressed.
let clicked = false;
userBtn.addEventListener('click', () => {
  signoutBtn.style.visibility = "visible";
  clicked = true;
});
document.addEventListener('click', () => {
  if (signoutBtn.style.visibility === 'visible' && !clicked) {
    console.log(signoutBtn.style.visibility);
    signoutBtn.style.visibility = 'hidden';
  }
  clicked = false;
})

// Sign out user.
signoutBtn.addEventListener("click", (event) => {
  const uuid = localStorage.getItem('uuid');
  sendRequest("POST", "https://35.85.29.142:3000/auth/logout", {uuid: uuid});
});


const partyOver = () => {
  containers.forEach(container => {
    container.classList.add(`${container.className.split(' ')[0]}-slide-to-left`);
  });
}
