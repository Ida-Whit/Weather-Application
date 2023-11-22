// Icon URL https://openweathermap.org/img/wn/10d@2x.png 

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
        console.log(data)  
        const city = document.getElementById("currentCity")
        for (let i = 0; i<5; i++) {
          const date = document.createElement("li")
          //const weatherConditions = document.createElement('li');
          const temperature = document.createElement('li');
          const humidity = document.createElement('li');
          const windSpeed = document.createElement("li");
  
          date.innerHTML = "Date: " + data.list[i].dt_txt
          //weatherConditions.innerHTML = data.list[i].weather;
          temperature.innerHTML = "Temperature: " + data.list[i].main.temp;
          humidity.innerHTML = "Humidity: " + data.list[i].main.humidity;
          windSpeed.innerHTML = "Wind Speed: " + data.list[i].wind.speed;
        
          city.appendChild(date)
          //city.appendChild(weatherConditions)
          city.appendChild(temperature)
          city.appendChild(humidity)
          city.appendChild(windSpeed)
        }
      });
  }


  // Listen for clean button click and clear local storage and recent searches buttons
  $("#clear-btn").on("click", function () {
    localStorage.clear();
    savedSearches.children().detach()
  })



  /* $("button").click(function() {
     $(".append").append(
 '<div class="added">New HTML element added</div>');
 } */
});