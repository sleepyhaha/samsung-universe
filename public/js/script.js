
let locationEl = document.querySelector("#destination");
let submitEl = document.querySelector("#submit");
let resultsEl = document.querySelector("#results");
let casinoEl = document.querySelector("#casinoBtn");
let museumEl = document.querySelector("#museumBtn");
let nightEl = document.querySelector("#nightlifeBtn");
let sightsEl = document.querySelector("#sightsBtn");
let zooEl = document.querySelector("#zooBtn");

//Get user location
submitEl.addEventListener("click", function (event) {
    event.preventDefault();
    runFetch();
});

//Set filter for original search
let type = "restaurant";

function runFetch() {
    //If fetch has already been run, delete rendered elements
    while (resultsEl.hasChildNodes()) {
        resultsEl.removeChild(resultsEl.firstChild);
    }

    //Fetch user latitude/longitudes with Google API
    let userLocation = locationEl.value;
    console.log(type);
    fetch(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        userLocation + "&key=AIzaSyDs00mT6NOOoam0gYfRl40xvUX51vedBqk"

    )
        .then(function (response) {
            console.log(userLocation);
            return response.json();
        })
        .then(function (data) {
            console.log(data.status);
            if (data.status == "ZERO_RESULTS") {
                let error = document.createElement("h2");
                error.classList.add("error");
                error.textContent = "Sorry, we couldn't find this location";
                resultsEl.append(error);
            }
            for (const issue of data.results) {
                const latitude = issue.geometry.location.lat;
                console.log(latitude);
                const longitude = issue.geometry.location.lng;
                console.log(longitude);

                //Google Places Fetch
                console.log(type);
                var apiUrl =
                    "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
                    latitude +
                    "%2C" +
                    longitude +
                    "&type=" +
                    type +
                    "&radius=6000&key=AIzaSyDs00mT6NOOoam0gYfRl40xvUX51vedBqk";
                console.log(apiUrl);
                fetch(apiUrl, {
                    method: "GET",
                    headers: [],
                })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data);
                        for (const issue of data.results) {
                            const name = issue.name;
                            const location = issue.vicinity;
                            let photoRef = issue.photos[0].photo_reference;
                            const rating = issue.rating;
                            const price = issue.price_level;
                            let photo =
                                "https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&maxheight=400&photo_reference=" +
                                photoRef +
                                "&sensor=false&key=AIzaSyDs00mT6NOOoam0gYfRl40xvUX51vedBqk";

                            //element creation
                            var img = document.createElement("img");
                            img.src = photo;
                            var nameDisplay = document.createElement("ul");
                            nameDisplay.innerText = name;
                            nameDisplay.classList.add("location-title");
                            var locationDisplay = document.createElement("ul");
                            locationDisplay.innerText = "Location: " + location;
                            locationDisplay.classList.add("location-address");
                            var ratingDisplay = document.createElement("ul");
                            ratingDisplay.innerText = "Rating: " + rating;
                            ratingDisplay.classList.add("location-rating");
                            var imgDiv = document.createElement("div");
                            imgDiv.classList.add("img-div");
                            var cardDiv = document.createElement("div");
                            cardDiv.id = "div_" + issue.name;
                            cardDiv.classList.add("card-whole");
                            var saveBtn = document.createElement("button");
                            saveBtn.textContent = "Save to your To Do List";
                            saveBtn.classList.add("save");
                            saveBtn.id = "btn_" + issue.name;

                            //element appending
                            resultsEl.append(cardDiv);
                            cardDiv.appendChild(nameDisplay);
                            cardDiv.append(imgDiv);
                            imgDiv.appendChild(img);
                            cardDiv.appendChild(locationDisplay);
                            cardDiv.appendChild(ratingDisplay);
                            var submitDiv = document.createElement("div");
                            cardDiv.append(submitDiv);
                            submitDiv.classList.add("submit-button");
                            submitDiv.appendChild(saveBtn);

                            //Fetch 

                            saveBtn.addEventListener("click", function () {

                                let data = {
                                    title: name,
                                    content: location,
                                    image: photo,
                                    account: "o"
                                };
                                console.log(data)

                                fetch("http://localhost:3001/api/", {
                                    mode: 'no-cors',
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        data
                                    })
                                })
                                    .then((data) => {
                                        console.log('Successful POST request:', data);
                                        return data;
                                    })
                                    .catch((error) => {
                                        console.error('Error in POST request:', error);
                                    });
                            })
                        }
                    });
            }
        })
}

casinoEl.addEventListener("click", function (event) {
    type = "casino";
    runFetch();
});
museumEl.addEventListener("click", function (event) {
    type = "museum";
    runFetch();
});
nightEl.addEventListener("click", function (event) {
    type = "night_club";
    runFetch();
});
sightsEl.addEventListener("click", function (event) {
    type = "tourist_attraction";
    runFetch();
});
zooEl.addEventListener("click", function (event) {
    type = "zoo";
    runFetch();
})