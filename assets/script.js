//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//https://api.openweathermap.org/data/2.5/forecast?q={city name},{state code}&appid={API key}

// Icon URL https://openweathermap.org/img/wn/10d@2x.png 

//`https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`

$(function () {
  //variables
  const userStorage = JSON.parse(localStorage.getItem("location")) || []
  const savedSearches = $(".savedSearches")
  const APIKey = "1b6d3059dfe3401cd669baece5f028da"
  //let iconurl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";

  // Pull from local Storage and display past searches on page load
  if (userStorage != null) {
    for (let i = 0; i < userStorage.length; i++) {
      savedSearches.append($("<button class = saved></button>").text(userStorage[i]))
    }
  }

  // Listen for search button click and fire function to add a button and run the API search for forecast
  $(".btn").on("click", function (event) {
    event.preventDefault();
    addSearched();
    currentWeather();
  })

  function addSearched() {
    let userInput = $(".form-control").val()
    userStorage.push(userInput)
    localStorage.setItem("location", JSON.stringify(userStorage))
    savedSearches.append($("<button class = saved></button>").text(userInput))
  }

    //Run API search for lat and long and then current weather
    function currentWeather () {
      let userCity = $("#city").val()
      let userState= $("#state").val()
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${userCity},${userState},us&appid=${APIKey}`)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        const latitude = data.city.coord.lat
        const longitude = data.city.coord.lon
    
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIKey}`)
        .then(function(response){
          return response.json()
        })
        .then(function (data) {
          console.log(data)
          const iconcode = data.weather[0].icon
          const iconurl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";
          const icon = document.createElement("img")
          const current = document.getElementById("current")
          const temperature = document.createElement('ul');
          const humidity = document.createElement('li');
          const windSpeed = document.createElement("li");
    
          temperature.innerHTML = "Temperature: " + data.main.temp + '\u00B0' + "F";
          humidity.innerHTML = "Humidity: " + data.main.humidity + "%";
          windSpeed.innerHTML = "Wind Speed: " + data.wind.speed + "mph";
    
          icon.setAttribute("src", iconurl)
    
          current.appendChild(temperature)
          temperature.appendChild(humidity)
          temperature.appendChild(windSpeed)
          current.appendChild(icon)
        })
      })
      forecast()
    };

  function forecast() {
    let userCity = $("#city").val()
    let userState= $("#state").val()
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${userCity},${userState},us&appid=${APIKey}`)
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    const latitude = data.city.coord.lat
    const longitude = data.city.coord.lon

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIKey}`)
    .then(function(response){
      return response.json()
    })  
    .then(function (data) {
        const city = document.getElementById("forecast")
        console.log(data)
        for (let i = 0; i < 40; i = i + 8) {
          let iconcode = data.list[i].weather[0].icon;
          let iconurl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";
          const date = document.createElement("ul")
          const temperature = document.createElement('li');
          const humidity = document.createElement('li');
          const windSpeed = document.createElement("li");
          const icon = document.createElement("img")

          icon.setAttribute("src", iconurl)
          date.innerHTML = "Date: " + data.list[i].dt_txt
          temperature.innerHTML = "Temperature: " + data.list[i].main.temp + '\u00B0' + "F";
          humidity.innerHTML = "Humidity: " + data.list[i].main.humidity + "%";
          windSpeed.innerHTML = "Wind Speed: " + data.list[i].wind.speed + "mph";
          
          city.appendChild(date)
          date.appendChild(icon)
          date.appendChild(temperature)
          date.appendChild(humidity)
          date.appendChild(windSpeed)
        }
      });
    });

  // Listen for clean button click and clear local storage and recent searches buttons
  $("#clear-btn").on("click", function () {
    localStorage.clear();
    savedSearches.children().detach()
  })
};
});
  /*//Listen for button click and take you to the search results of that button
  $(".savedSearches").on("click", ".saved", function(event) {
    console.log(this)  
    event.preventDefault();
      $("#input").val(this.textContent)
      $(".btn").click()   
  })*/