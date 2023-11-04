function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = '0' + hours;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = '0' + minutes;
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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayWeatherData(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  let weatherData = response.data;
  
  temperatureElement.innerHTML = Math.round(weatherData.temperature.current);
  cityElement.innerHTML = weatherData.city;
  descriptionElement.innerHTML = weatherData.condition.description;
  humidityElement.innerHTML = weatherData.temperature.humidity;
  windElement.innerHTML = weatherData.wind.speed;
  dateElement.innerHTML = formatDate(weatherData.time * 1000);
  iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${weatherData.condition.icon}.png`);
  iconElement.setAttribute("alt", weatherData.condition.description);
}

function searchCity(city) {
  let apiKey = "b50343183o490adctc2bad01bf0a4ae0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherData).catch(function (error) {
    console.error("API request error:", error);
  });
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let forecast = document.querySelector("#forecast");
forecast.innerHTML = `
  <div class="weather-forecast">
    <div class="row">
      <div class="col-2">
        <div class="weather-forecast-date">
          Thursday
          <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-night.png" alt="" width="36" />
        </div>
        <div class="weather-forecast-temperature">
          <div>
            <span class="weather-forecast-temperature-max">
              18&deg
            </span>
            <span class="weather-forecast-temperature-min">
              12&deg
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("London");