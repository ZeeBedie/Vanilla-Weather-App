function displayTemperature(response) {
  try {
    const temperatureElement = document.querySelector("#temperatureid");
    const cityElement = document.querySelector("#city");
    const descriptionElement = document.querySelector("#description");
    const humidityElement = document.querySelector("#humidity");
    const windElement = document.querySelector("#wind");
    const dateElement = document.querySelector("#date");
    const iconElement = document.querySelector("#icon");

    const temperature = response.data.temperature.current;
    const cityName = response.data.city;
    const weatherDescription = response.data.condition.description;
    const humidity = response.data.temperature.humidity;
    const wind = response.data.wind.speed;
    const iconUrl = response.data.condition.icon_url;

    const currentDate = new Date();
    const options = {
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = currentDate.toLocaleString(undefined, options);

    temperatureElement.innerHTML = Math.round(temperature);
    cityElement.innerHTML = cityName;
    descriptionElement.innerHTML = weatherDescription;
    humidityElement.innerHTML = `${humidity}%`;
    windElement.innerHTML = `${wind} m/s`;
    dateElement.innerHTML = formattedDate;
    iconElement.setAttribute("src", iconUrl);
  } catch (error) {
    console.error("Error handling API response:", error);
  }
}

function displayForecast(response) {
  console.log(response.data);
  const forecastElement = document.querySelector("#forecast");
  const daysOfWeek = ["Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday"];
  const weatherImages = ["rain-image.png", "sunny-image.png", "sunny-image.png", "cloudy-image.png", "rain-image.png", "sunny-image.png"];
  const temperatureMax = [18, 20, 22, 19, 17, 21];
  const temperatureMin = [12, 14, 16, 13, 11, 15];
  
  let forecastHTML = '<div class="row">';

  for (let i = 0; i < daysOfWeek.length; i++) {
    forecastHTML += `
      <div class="col-md-2">
        <div class="weather-forecast-date">${daysOfWeek[i]}</div>
        <img src="images/${weatherImages[i]}" alt="weather" width="22px" />
        <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-maximum">${temperatureMax[i]}&deg</span>
          <span class="weather-forecast-temperature-minimum">${temperatureMin[i]}&deg</span>
        </div>
      </div>`;
  }

  forecastHTML += '</div>';
  forecastElement.innerHTML = forecastHTML;
}

function getforecast(coordinates) {
  console.log(coordinates);
  const apiKey = "b50343183o490adctc2bad01bf0a4ae0";
  const apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function search(event) {
  event.preventDefault();
  const cityInputElement = document.querySelector("#city-input");
  const apiKey = "b50343183o490adctc2bad01bf0a4ae0";
  const city = cityInputElement.value;
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  displayForecast(); // Call the displayForecast function

  axios
    .get(apiUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
    .then(function (response) {
      // Call the getforecast function with the response data
      getforecast(response.data.coordinates);
      displayTemperature(response);
    });
}

// Attach the event listener to the form
const form = document.querySelector("#search-form");
form.addEventListener("submit", search);
