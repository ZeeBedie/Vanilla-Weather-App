function displayTemperature(response) {
  try {
    const temperatureElement = document.querySelector('#temperatureid');
    const cityElement = document.querySelector('#city');
    const descriptionElement = document.querySelector('#description');
    const humidityElement = document.querySelector('#humidity');
    const windElement = document.querySelector('#wind');
    const dateElement = document.querySelector('#date');

    const temperature = response.data.temperature.current;
    const cityName = response.data.city;
    const weatherDescription = response.data.condition.description;
    const humidity = response.data.temperature.humidity;
    const wind = response.data.wind.speed;

    // Get the current date and format it
    const currentDate = new Date();
    const options = {
      weekday: 'long', // Display the full weekday name
      hour: 'numeric', // Display the hour in 12-hour format
      minute: 'numeric', // Display the minutes
      hour12: true, // Use 12-hour format with AM/PM
    };
    const formattedDate = currentDate.toLocaleString(undefined, options);

    temperatureElement.innerHTML = Math.round(temperature);
    cityElement.innerHTML = cityName;
    descriptionElement.innerHTML = weatherDescription;
    humidityElement.innerHTML = `${humidity}`;
    windElement.innerHTML = `${wind} m/s`;
    dateElement.innerHTML = `${formattedDate}`;
  } catch (error) {
    console.error("Error handling API response:", error);
  }
}

let apiKey = "b50343183o490adctc2bad01bf0a4ae0";
let city = "Lisbon";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

axios.get(apiUrl, {
  headers: {
    "Authorization": `Bearer ${apiKey}`
  }
}).then(displayTemperature);
