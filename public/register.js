async function register(login, email, password, confirmed_password) {
    if (password === confirmed_password) {
        let request = internalFetch()

        let response = await request.post({
            url: "http://localhost:8080/auth/signup",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                userName: login,
                email: email,
                password: password
            },
            credentials: "same-origin"
        })

        console.log(response)
    }
    else {
        alert("Введённые пароли не совпадают, попробуйте ещё раз.")
    }
}