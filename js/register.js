
$("form").submit(function (event) {
  event.preventDefault();
  console.log($(this).serializeArray());

  const loginData = $(this).serializeArray();

  const login = loginData[0].value;
  const password = loginData[1].value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (login === '' || password === '') {
    $("#emptyRegisterError").addClass("showError");
    return;
  }

  if (users.some((user) => user.login === login)) {
    $("#registerError").addClass("showError");
    $("#emptyRegisterError").removeClass("showError");
    console.log("login istnieje");
  } else {
    $("#emptyRegisterError").removeClass("showError");
    $("#registerError").removeClass("showError");
    const newUser = { login, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user", JSON.stringify(newUser.login));
    window.location.href = "index.html";
  }
  event.preventDefault();
});




