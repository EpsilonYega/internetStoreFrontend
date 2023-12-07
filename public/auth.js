function redirectToAdminPage(login, password) {
  if (login == "admin" && password == "admin") {
    console.log("admin")
    window.open("admin.html");
  } else {
    console.log("user")
    window.open("index.html");
  }
}