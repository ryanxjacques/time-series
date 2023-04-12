
const loginButton = document.getElementById("login-button");
const credSubmitButton = document.getElementById("submit-button");
const loginPrompt = document.getElementById("login-prompt");

const USER = "admin";
const PASS = "admin";

function display(x){
  x.style.display = "block";
}

function hide(x){
  x.style.display = "block";
}

function validate_admin(user, pass){
  if (user == USER && pass == PASS){
    alert("success");
  } else {
    alert("fail");
  }
}

loginButton.addEventListener("click", function() {
  display(loginPrompt);
});

credSubmitButton.addEventListener("click", function() {
  var user = document.getElementById("admin-username").value;
  var pass = document.getElementById("admin-password").value;
  validate_admin(user, pass)
  hide(loginPrompt);
});