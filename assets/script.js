//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//https://api.openweathermap.org/data/2.5/forecast?q={city name},{state code}&appid={API key}


//`https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`



$(function () {
  //variables
  const userStorage = JSON.parse(localStorage.getItem("location")) || []
  const savedSearches = $(".savedSearches")
  const APIKey = "1b6d3059dfe3401cd669baece5f028da"
  const icon = document.createElement("img")
  const current = document.getElementById("current")
  const temperatureC = document.createElement('ul');
  const humidity = document.createElement('li');
  const windSpeed = document.createElement("li");
  const name = document.createElement("h1");

  // Pull from local Storage and display past searches on page load
  if (userStorage != null) {
    for (let i = 0; i < userStorage.length; i++) {
      savedSearches.append($("<button class = btn-secondary btn></button>").text(userStorage[i]))
    }
  }

  // Listen for clean button click and clear local storage and recent searches buttons
  $("#clear-btn").on("click", function () {
    localStorage.clear();
    savedSearches.children().detach()
  })

  // Listen for search button click and fire function to add a button and run the API search for forecast
  $(".btn").on("click", function (event) {
    event.preventDefault();
    addSearched();
    currentWeather();
  })

  //Listen for button click and take you to the search results of that button
  $(".btn-secondary").on("click", function(event) {
    event.preventDefault();
    newVariable = this.textContent.split(", ")
    $("#city").val(newVariable[0])
    $("#state").val(newVariable[1])
    $(".btn").click()
  })

  function addSearched() {
    const userCity = $("#city").val()
    const userState = $("#state").val()
    userInput = userCity + ", " + userState
    userStorage.push(userInput)
    localStorage.setItem("location", JSON.stringify(userStorage))
    savedSearches.append($("<button class = btn-secondary btn></button>").text(userInput))
  }

  //Run API search for lat and long and then current weather
  function currentWeather() {
    let userCity = $("#city").val()
    let userState = $("#state").val()
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${userCity},${userState},us&appid=${APIKey}`)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        const latitude = data.city.coord.lat
        const longitude = data.city.coord.lon

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIKey}`)
          .then(function (response) {
            return response.json()
          })
          .then(function (data) {
            const date = dayjs()
            const iconcode = data.weather[0].icon
            const iconurl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";

            name.innerHTML = userCity + ", " + userState;
            current.innerHTML = date.format("dddd, MMMM D, YYYY")
            temperatureC.innerHTML = "Temperature: " + data.main.temp + '\u00B0' + "F";
            humidity.innerHTML = "Humidity: " + data.main.humidity + "%";
            windSpeed.innerHTML = "Wind Speed: " + data.wind.speed + "mph";

            icon.setAttribute("src", iconurl)

            current.appendChild(name)
            name.appendChild(icon)
            name.appendChild(temperatureC)
            name.appendChild(humidity)
            name.appendChild(windSpeed)
          })
      })
    forecast()
  };

  //Run API for a 5-day forecast
  function forecast() {
    let userCity = $("#city").val()
    let userState = $("#state").val()

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${userCity},${userState},us&appid=${APIKey}`)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        const latitude = data.city.coord.lat
        const longitude = data.city.coord.lon

        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIKey}`)
          .then(function (response) {
            return response.json()
          })
          .then(function (data) {
            const city = document.getElementById("forecast")
            city.innerHTML = ""
            for (let i = 0; i < 40; i = i + 8) {
              let iconcode = data.list[i].weather[0].icon;
              let iconurl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";
              const date = document.createElement("ul")
              const temperature = document.createElement('li');
              const humidity = document.createElement('li');
              const windSpeed = document.createElement("li");
              const icon = document.createElement("img")

              date.innerHTML = "Date: " + data.list[i].dt_txt
              temperature.innerHTML = "Temperature: " + data.list[i].main.temp + '\u00B0' + "F";
              humidity.innerHTML = "Humidity: " + data.list[i].main.humidity + "%";
              windSpeed.innerHTML = "Wind Speed: " + data.list[i].wind.speed + "mph";

              icon.setAttribute("src", iconurl)

              city.appendChild(date)
              date.appendChild(icon)
              date.appendChild(temperature)
              date.appendChild(humidity)
              date.appendChild(windSpeed)
            }
          });
      });
  };
});
