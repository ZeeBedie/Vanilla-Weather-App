function displayTemperature(response) {
  console.log(response.data.main);
}

let apiKey = "b50343183o490adctc2bad01bf0a4ae0";
let city = "NewYork";
let apiUrl = "https://api.shecodes.io/weather/v1/current?query={query}&key={key}";
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
