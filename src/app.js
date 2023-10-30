function displayTemperature(response) {
  console.log(apiUrl);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector ("#humidity");
  let windElement=document.querySelector ("#wind");
  temperatureElement.innerHTML = Math.round (response.data.temperature.current);
  cityElement.innerHTML= response.data.city;
  descriptionElement.innerHTML=response.data.condition.description;
  humidityElement.innerHTML=response.data.temperature.humidity;
  windElement.innerHTML = response.data.wind.speed;

}

let aiKey ="b50343183o490adctc2bad01bf0a4ae0";
let apiUrl='https://api.shecodes.io/weather/v1/current?query=London&key=b50343183o490adctc2bad01bf0a4ae0&units=metric';
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);