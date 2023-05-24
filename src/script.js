let currentTime = new Date();
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
let time = document.querySelector("#interactive-time");
time.innerHTML = `${day}:${hours}:${minutes}`;

function submit(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#city-input");
  let apiKey = "b1516247bcf3af5a73534a503b5e2c3b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCurrentTemp);
}
function getCurrentTemp(response) {
  let h1 = document.querySelector("h1");
  let currentSearchCityTemp = response.data.main.temp;
  h1.innerHTML = `It's ${currentSearchCityTemp}°C in ${response.data.name} today!`;
}

let form = document.querySelector("#submit-city");
form.addEventListener("submit", submit);

function displayConversion(event) {
  let fValue = (17 * 9) / 5 + 32;
  event.preventDefault();
  alert(`The temperature in °F is ${fValue}`);
}
function revertConversion(event) {
  alert(`The temperature in °C is 17`);
}
function currentLocationCall(event) {
  navigator.geolocation.getCurrentPosition(showLocation);
}
function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "dde1f2d647a3967cf125beb90ab44f1f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function showTemperature(response) {
  let localTemperature = response.data.main.temp;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `The current temperature in your location is ${localTemperature}`;
}

let geoApi = document.querySelector("#current-location");
geoApi.addEventListener("submit", currentLocationCall);

let conversionC = document.querySelector("#convertC");
conversionC.addEventListener("click", revertConversion);

let conversionF = document.querySelector("#convertF");
conversionF.addEventListener("click", displayConversion);
