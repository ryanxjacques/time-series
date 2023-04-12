
const loginButton = document.getElementById("login-button");
const credSubmitButton = document.getElementById("submit-button");
const loginPrompt = document.getElementById("login-prompt");


function display(x){
  x.style.display = "block";
}

function hide(x){
  x.style.display = "block";
}

loginButton.addEventListener("click", function() {
  display(loginPrompt);
});
credSubmitButton.addEventListener("click", function() {
  hide(loginPrompt);
});