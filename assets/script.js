// Icon URL https://openweathermap.org/img/wn/10d@2x.png 

//`https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`

$(function () {
  //letiables
  const userStorage = JSON.parse(localStorage.getItem("location")) || []
  const savedSearches = $(".savedSearches")
  const APIKey = "1b6d3059dfe3401cd669baece5f028da"

  // Pull from local Storage and display past searches on page load
  if (userStorage != null) {
    for (let i = 0; i < userStorage.length; i++) {
      savedSearches.append($("<button></button>").text(userStorage[i]))
    }
  }

  // Listen for search button click and fire function to add a button and run the API search for latitude and logitude
  $(".btn").on("click", function (event) {
    event.preventDefault();
    addSearched();
    findWeather();
  })

  function addSearched() {
    let userInput = $(".form-control").val()
    userStorage.push(userInput)
    localStorage.setItem("location", JSON.stringify(userStorage))
    savedSearches.append($("<button></button>").text(userInput))
  }

  function findWeather() {
    let userInput = $(".form-control").val()
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&units=imperial&appid=${APIKey}`)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        const city = document.getElementById("currentCity")

        for (let i = 0; i < 40; i = i + 8) {
          const newObject = Object.create(data.list[i]);
          let iconcode = newObject.weather[0].icon;
          let iconurl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";

          const date = document.createElement("ul")
          const temperature = document.createElement('li');
          const humidity = document.createElement('li');
          const windSpeed = document.createElement("li");
          const icon = document.createElement("img")

          $("img").attr("src", iconurl)
          date.innerHTML = "Date: " + data.list[i].dt_txt
          temperature.innerHTML = "Temperature: " + data.list[i].main.temp;
          humidity.innerHTML = "Humidity: " + data.list[i].main.humidity;
          windSpeed.innerHTML = "Wind Speed: " + data.list[i].wind.speed;

          city.appendChild(date)
          date.appendChild(icon)
          date.appendChild(temperature)
          date.appendChild(humidity)
          date.appendChild(windSpeed)
        }
      });
  }


  // Listen for clean button click and clear local storage and recent searches buttons
  $("#clear-btn").on("click", function () {
    localStorage.clear();
    savedSearches.children().detach()
  })
});