const activateCode = document.querySelector("#activate-code");
const userSubmit = document.querySelector("#submit-confirm");

userSubmit.addEventListener("click", async () => {

    const z = new URL(window.location.href).searchParams.get("account");

    const payload = {

        username: z,
        inputActivateCode: activateCode.value, // MUST BE A STRING

    }

    await fetch("/accountconfirm", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),

    });

});