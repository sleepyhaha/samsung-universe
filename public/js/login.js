const userUsername = document.querySelector("#username");
const userPassword = document.querySelector("#password");
const userSubmit = document.querySelector("#submit");

userSubmit.addEventListener("click", async () => {

    const payload = {

        username: userUsername.value,
        password: userPassword.value

    }

    const login = await fetch("/login", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),

    });

    if (login.status === 200) window.location.href = "/";
    if (login.status === 400) alert("Wrong username or password. Please try again.");
    else window.location.href = "/";

});