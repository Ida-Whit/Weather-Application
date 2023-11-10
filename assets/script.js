// Open Weather API Key 1b6d3059dfe3401cd669baece5f028da

// Call to Open Weather API: https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// Call to Open Weather API for Lat,Long: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
const userStorage = localStorage.getItem("location") || []

$("#btn").on("click", function(){
  $(this).val('')
  console.log("Hello")
  //let userInput = $("#input").val()
  //userStorage.push(userInput)
  //localStorage.setItem("location", userInput)
  $("#past-cities").append(
    "<li></li>")
})


//fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + {city name},{state code},{country code} + "&limit=5&appid=1b6d3059dfe3401cd669baece5f028da")
  //  .then (let coordinates = )


 /* $("button").click(function() {
    $(".append").append(
'<div class="added">New HTML element added</div>');
} */