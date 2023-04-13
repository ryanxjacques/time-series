const loginButton = document.getElementById("login-button");
const loginPopup = new LoginForm("login-popup");
const submit = document.getElementById("login-popup");
const USER = "admin";
const PASS = "admin";


function validate_admin(user, pass){
  if (user == USER && pass == PASS){
    alert("success");
  } else {
    alert("fail");
  }
}

loginButton.addEventListener("click", function() {
  if (loginPopup.hidden) {
    // only one login popup allowed at a time.
    loginPopup.show();
  }
});

