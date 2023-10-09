function displayTemperature(response) {
  try {
    const temperatureElement = document.querySelector('#temperatureid');
    const cityElement = document.querySelector('#city');
    const descriptionElement = document.querySelector('#description');

    const temperature = response.data.temperature.current;
    const cityName = response.data.city;
    const weatherDescription = response.data.condition.description;

    temperatureElement.innerHTML = Math.round(temperature);
    cityElement.innerHTML = cityName;
    descriptionElement.innerHTML = weatherDescription;
  } catch (error) {
    console.error("Error handling API response:", error);
  }
}

let apiKey = "b50343183o490adctc2bad01bf0a4ae0";
let city = "Lisbon";
let apiUrl = 'https://api.shecodes.io/weather/v1/current?query=Lisbon&key=b50343183o490adctc2bad01bf0a4ae0';

axios.get(apiUrl, {
  headers: {
    "Authorization": `Bearer ${apiKey}`
  }
}).then(displayTemperature);

