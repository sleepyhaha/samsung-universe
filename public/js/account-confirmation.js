const activateCode = document.querySelector("#activate-code");
const userSubmit = document.querySelector("#submit-confirm");

userSubmit.addEventListener("click", async () => {

    const payload = {

        // username: "broski69",
        inputActivateCode: activateCode, // MUST BE A STRING

    }

    await fetch("/accountconfirm", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),

    });

});