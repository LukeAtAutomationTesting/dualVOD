class LoginPage {

login () {
  window.location.href = "index.html";
  const loginBtnMainPage = document.querySelector('.navigation__logging-button');
  const parent = loginBtnMainPage.parentNode;
  parent.removeChild(loginBtnMainPage);
  console.log('should be removed')
}
}

$("form").submit(function (event) {
  event.preventDefault();

  const loginData = $(this).serializeArray();

  const login = loginData[0].value;
  const password = loginData[1].value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find((user) => user.login === login);

  if (login === '' || password === '') {
    $("#emptyRegisterError").addClass("showError");
    $("#loginError").removeClass("showError");
    $("#passwordError").removeClass("showError");
    return;
  }

  if (user) {
    console.log(user, login, password);
    if (user.password === password) {
      $("#loginError").removeClass("showError");
      $("#emptyRegisterError").removeClass("showError");
      $("#passwordError").removeClass("showError");

      localStorage.setItem("user", JSON.stringify(user.login));
      let loginPage = new LoginPage();
      loginPage.login();
    } else {
      console.log("Wrong password");
      $("#passwordError").addClass("showError");
      $("#emptyRegisterError").removeClass("showError");
      $("#loginError").removeClass("showError");
    }
  } else {
    $("#loginError").addClass("showError");
    $("#passwordError").removeClass("showError");
    $("#emptyRegisterError").removeClass("showError");
    console.log("Wrong login");
  }
});
