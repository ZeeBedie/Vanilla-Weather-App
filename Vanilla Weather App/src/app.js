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
    dateElement.innerHTML = `${formattedDate}`;

    
    const iconUrl = response.data.condition.icon_url;
    iconElement.setAttribute('src', iconUrl);
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
