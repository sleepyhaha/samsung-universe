let resultsEl = document.querySelector("#results");


function getFetch() {
    fetch("http://localhost:3001/api/", {
        mode: 'cors',
        method: "GET",
        headers: {
            'Content-Type': 'application/json',

        },
    }).then(resp => resp.json())
        .then((data) => {
            console.log('Successful GET request:', data);
            if (Array.isArray(data)) {
                for (const issue of data) {
                    const title = issue.title;
                    const location = issue.content;
                    const photo = issue.image;

                    //element creation
                    let img = document.createElement("img");
                    img.src = photo;
                    console.log(photo)
                    img.classList.add("h-48", "w-40", "m-auto", "rounded-lg");

                    let titleDisplay = document.createElement("ul");
                    titleDisplay.innerText = title;
                    titleDisplay.classList.add(
                        "location-title",
                        "text-center",
                        "text-sm",
                        "font-bold",
                        "py-2"
                    );

                    let locationDisplay = document.createElement("ul");
                    locationDisplay.innerText = location;
                    locationDisplay.classList.add(
                        "location-address",
                        "text-sm",
                        "text-center"
                    );

                    let imgDiv = document.createElement("div");
                    imgDiv.classList.add("img-div");

                    let cardDiv = document.createElement("div");
                    cardDiv.id = "div_" + issue.name;
                    cardDiv.classList.add(
                        "card-whole",
                        "h-80",
                        "w-64",
                        "relative",
                        "mb-5"
                    );

                    //element appending
                    resultsEl.append(cardDiv);
                    cardDiv.append(imgDiv);
                    console.log(photo)
                    imgDiv.appendChild(img);
                    imgDiv.appendChild(titleDisplay);
                    cardDiv.appendChild(locationDisplay);
                }
            }
        })

        .catch((error) => {
            console.error('Error in GET request:', error);
        });
}


getFetch()