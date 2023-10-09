function displayTemperature(response) {
  try {
    const temperatureElement = document.querySelector('#temperatureid');
    const cityElement = document.querySelector('#city');
    const descriptionElement = document.querySelector('#description');
    const humidityElement = document.querySelector('#humidity');
    const windElement = document.querySelector('#wind');
    const dateElement = document.querySelector('#date');
    const iconElement = document.querySelector('#icon');

    const temperature = response.data.temperature.current;
    const cityName = response.data.city;
    const weatherDescription = response.data.condition.description;
    const humidity = response.data.temperature.humidity;
    const wind = response.data.wind.speed;
    const iconUrl = response.data.condition.icon_url;

    const currentDate = new Date();
    const options = {
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    const formattedDate = currentDate.toLocaleString(undefined, options);

    temperatureElement.innerHTML = Math.round(temperature);
    cityElement.innerHTML = cityName;
    descriptionElement.innerHTML = weatherDescription;
    humidityElement.innerHTML = `${humidity}%`;
    windElement.innerHTML = `${wind} m/s`;
    dateElement.innerHTML = formattedDate;
    iconElement.setAttribute('src', iconUrl);
  } catch (error) {
    console.error("Error handling API response:", error);
  }
}

function search(event) {
  event.preventDefault();
  const cityInputElement = document.querySelector("#city-input");
  const apiKey = "b50343183o490adctc2bad01bf0a4ae0";
  const city = cityInputElement.value;
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl, {
    headers: {
      "Authorization": `Bearer ${apiKey}`
    }
  }).then(displayTemperature);
}

// Attach the event listener to the form
const form = document.querySelector("#search-form");
form.addEventListener("submit", search);
