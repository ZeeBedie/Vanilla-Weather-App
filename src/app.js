function displayTemperature(response) {
  try {
    // Your existing code to display current weather data

    // Call the displayForecast function here
    displayForecast();
  } catch (error) {
    console.error("Error handling API response:", error);
  }
}

function displayForecast() {
  const forecastElement = document.querySelector("#forecast");
  const days = ["Thurs", "Fri", "Sat", "Sun", "Mon"];
  let forecastHTML = '<div class="row">';

  days.forEach((day) => {
    forecastHTML += `
      <div class="col-md-2">
        <div class="weather-forecast-date">
          ${day}
        </div>
        <img src="images/rain-image.png" alt="raining" width="22px" />
        <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-maximum">
            18&deg
          </span>
          <span class="weather-forecast-temperature-minimum">
            12&deg
          </span>
        </div>
      </div>
    `;
  });

  forecastHTML += "</div>";
  forecastElement.innerHTML = forecastHTML;
}

function search(event) {
  event.preventDefault();
  const cityInputElement = document.querySelector("#city-input");
  const apiKey = "b50343183o490adctc2bad01bf0a4ae0";
  const city = cityInputElement.value;
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios
    .get(apiUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
    .then(displayTemperature);
}

// Attach the event listener to the form
const form = document.querySelector("#search-form");
form.addEventListener("submit", search);
