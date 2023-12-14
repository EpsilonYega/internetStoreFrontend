function redirectToAdminPage(login, password) {
  if (login == "admin" && password == "admin") {
    window.open("admin.html");
  } else {
    window.open("index.html");
  }
}

function getJwtToken() {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === "jwtToken") {
      return cookie[1];
    }
  }
  return null;
}

async function authMethod(login, password) {

  let request = internalFetch()

  let response = await request.post({
    url: "http://localhost:8080/auth/signin",
    headers: {
        "Content-Type": "application/json"
    },
    body: {
        userName: login,
        password: password
    },
    credentials: "same-origin"
  })
  
  if(response.status === 200) {
    console.log("success", response)
    document.cookie = `jwtToken=${response.message}; path=/; maxAge=100000000`;
  }
  else {
    console.log("fail", response)
  }

  const token = getJwtToken()

  if (token === null) {
    alert("Не удалось войти. Проверьте корректность данных")
  }
  else {
    alert("Вход выполнен успешно")
  }

  if (login == "admin" && password == "admin") { 
    window.open("admin.html"); 
  }
  else {
    window.open("index.html")
  }
}