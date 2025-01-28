const apiKey = "762a08b6ec8721e3086dbdb22e9008e9";
const city = "Barquisimeto";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

const weatherInfo = document.getElementById("weather-info");
const forecastInfo = document.getElementById("forecast-info");

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;

    weatherInfo.innerHTML = `
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
    `;
  })
  .catch((error) => {
    weatherInfo.innerHTML = `<p>Error loading weather data.</p>`;
    console.error("Error fetching weather data:", error);
  });

fetch(forecastUrl)
  .then((response) => response.json())
  .then((data) => {
    const forecast = data.list.filter((reading) =>
      reading.dt_txt.includes("12:00:00")
    );
    forecastInfo.innerHTML = "";

    forecast.forEach((day) => {
      const date = new Date(day.dt_txt).toLocaleDateString("en-US", {
        weekday: "long",
      });
      const temp = day.main.temp;
      forecastInfo.innerHTML += `<p>${date}: <strong>${temp}°C</strong></p>`;
    });
  })
  .catch((error) => {
    forecastInfo.innerHTML = `<p>Error loading forecast data.</p>`;
    console.error("Error fetching forecast data:", error);
  });
