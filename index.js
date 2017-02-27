var lat, lon, response;

// Get current position latitude and longitude

navigator.geolocation.getCurrentPosition(function(position) {
  lat = position.coords.latitude.toFixed(2);
  lon = position.coords.longitude.toFixed(2);
  sendRequest();
});

// Send request to OpenWeatherMap

function sendRequest() {
  var req = new XMLHttpRequest();
  var openWeather = 'http://api.openweathermap.org/data/2.5/weather?';
  var apiKey = '978d2807f5d2ae0b2bc182f6d8b9d83d';
  var url = `${openWeather}lat=${lat}&lon=${lon}&APPID=${apiKey}`;

  req.open('GET', url);
  req.onload = function() {
    response = JSON.parse(this.responseText);
    updateInfo();
    setPhoto();
  };
  req.send();
}

// Update location, temperature, weather and wind speed on the screen

function updateInfo() {
  var temp = parseInt(response.main.temp - 273);
  var place = response.name + ', ' + response.sys.country;
  document.getElementById('location').innerHTML = place;
  document.getElementById('temp').innerHTML = `${temp}${String.fromCharCode(176)}C`;
  document.getElementById('weather').innerHTML = response.weather[0].main;
  document.getElementById('wind').innerHTML = 'Wind speed ' + parseInt(response.wind.speed * 3.6) + ' km/h';
}

// Change background image based on weather

var cont = document.getElementById("container");

function setPhoto() {
  var weather = response.weather[0].main;
  if (weather === 'Clouds') {
    cont.style.backgroundImage = "url('images/clouds.jpg')";
  } else if (weather === 'Snow') {
    cont.style.backgroundImage = "url('images/snow.jpg')";
  } else if (weather === 'Rain' || weather === 'Drizzle' || weather === 'Thunderstorm') {
    cont.style.backgroundImage = "url('images/rain.jpg')";
    cont.style.color = 'white';
  } else if (weather === 'Clear') {
    cont.style.backgroundImage = "url('images/clear.jpg')";
  } else {
    cont.style.backgroundImage = "url('images/random.jpg')";
    cont.style.color = 'white';
  }
}

/*
background-image: url('images/snow.png');

function changeUnit() {
  button.className = (button.className === "celsius") ? "fahrenheit" : "celsius";
  button.addEventListener('click', changeUnit, false);
}
*/
