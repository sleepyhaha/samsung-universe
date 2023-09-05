const userUsername = document.querySelector("#username");
const userPassword = document.querySelector("#password");
const userSubmit = document.querySelector("#submit");

userSubmit.addEventListener("click", async () => {

    const payload = {

        username: userUsername.value,
        password: userPassword.value

    }

    const user = await fetch("/login", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),

    });

    console.log(await user.json());

    // window.location.href = `/accountconfirm?account=${await user.json()}`;

});