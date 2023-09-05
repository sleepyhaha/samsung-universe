

const userEmail = document.querySelector("#email");
const userUsername = document.querySelector("#username");
const userPassword = document.querySelector("#password");
const userSubmit = document.querySelector("#submit");

userSubmit.addEventListener("click", async () => {

    const payload = {

        email: userEmail.value,
        username: userUsername.value,
        password: userPassword.value

    }

    const user = await fetch("/createuser", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),

    });

    window.location.href = `/accountconfirm?account=${await user.json()}`;

});