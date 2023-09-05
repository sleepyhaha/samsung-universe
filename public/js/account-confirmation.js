const activateCode = document.querySelector("#activate-code");
const userSubmit = document.querySelector("#submit-confirm");

userSubmit.addEventListener("click", async () => {

    const parsedUsername = new URL(window.location.href).searchParams.get("account");

    const payload = {

        username: parsedUsername,
        inputActivateCode: activateCode.value, // MUST BE A STRING

    }

    let confirmation = await fetch("/accountconfirm", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),

    });

    if (confirmation.status === 200) window.location.href = "/";
    if (confirmation.status === 400) alert("Wrong code! Please try again.");
    else window.location.href = "/";

});