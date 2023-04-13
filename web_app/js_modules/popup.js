class LoginForm {
  constructor(id) {
    this.id = id;
    this.hidden = true;
  }
  
  isHidden() {
    return this.hidden;
  }

  show() {
    this.hidden = false;

    const node = document.createElement("dialog");
    node.id = this.id;
    node.classList.add("font");
    
    // Form HTML
    node.innerHTML = "\
      <form> \
        <p>Sign in</p> \
        <label for=\"uname\">Username:</label> \
        <input type=\"text\" value=\"admin\" id=\"admin-username\" name=\"uname\"> \
        <br> \
        <br> \
        <label for=\"pword\">Password:</label> \
        <input type=\"text\" value=\"admin\" id=\"admin-password\" name=\"pword\"> \
        <br> \
        <br> \
        <input type=\"submit\" value=\"Submit\" id=\"submit-button\"> \
      </form>";

    // Note: getElementByTagName returns an list.
    document.getElementsByTagName("body")[0].appendChild(node);

    // While alive, check for submit.
    node.addEventListener("submit", function(){
      const username = document.getElementById("admin-username").value;
      const password = document.getElementById("admin-password").value;
      if (username == "admin" && password == "admin") {
        alert("login successful");
      } else {
        alert("login failed");
      }
    });
  }
}
