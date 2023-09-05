let locationEl = document.querySelector("#destination");
let submitEl = document.querySelector("#submit");
let resultsEl = document.querySelector("#results");
let casinoEl = document.querySelector("#casinoBtn");
let museumEl = document.querySelector("#museumBtn");
let nightEl = document.querySelector("#nightlifeBtn");
let sightsEl = document.querySelector("#sightsBtn");
let zooEl = document.querySelector("#zooBtn");

// const dotenv = require("dotenv");

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
      userLocation +
      "&key=AIzaSyDs00mT6NOOoam0gYfRl40xvUX51vedBqk"
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
              let img = document.createElement("img");
              img.src = photo;
              img.classList.add("h-48", "w-40", "m-auto", "rounded-lg");

              let nameDisplay = document.createElement("ul");
              nameDisplay.innerText = name;
              nameDisplay.classList.add(
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
                "ml-2"
              );

              let ratingDisplay = document.createElement("ul");
              ratingDisplay.innerText = "Rating: " + rating;
              ratingDisplay.classList.add(
                "location-rating",
                "text-sm",
                "absolute",
                "bottom-3",
                "ml-2"
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

              let saveBtn = document.createElement("button");
              saveBtn.classList.add(
                "save",
                "fa-regular",
                "fa-star",
                "fa-xl",
                "absolute",
                "bottom-6",
                "right-2"
              );
              saveBtn.style.color = "#000000";
              saveBtn.id = "btn_" + issue.name;

              //element appending
              resultsEl.append(cardDiv);
              cardDiv.append(imgDiv);
              imgDiv.appendChild(img);
              imgDiv.appendChild(nameDisplay);
              cardDiv.appendChild(locationDisplay);
              cardDiv.appendChild(ratingDisplay);
              let submitDiv = document.createElement("div");
              cardDiv.append(submitDiv);
              submitDiv.classList.add("submit-button");
              submitDiv.appendChild(saveBtn);
              saveBtn.addEventListener("click", () => {
                saveBtn.classList.toggle("fa-solid");
              });
            }
          });
      }
    });
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
});
