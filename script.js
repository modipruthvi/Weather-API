const apiKey = "3f6101e7d4deceebf2a03de92b7e6703";

const cityInput = document.querySelector("#city");
const searchBtn = document.querySelector("#searchBtn");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city == "") {
        alert("Please enter city name");
        return;
    }
    getWeather(city);
});

cityInput.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        const city = cityInput.value.trim();
        if (city == "") {
            alert("Please enter city name");
            return;
        }
        getWeather(city);
    }
});

function getWeather(city) {
    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            displayWeather(data);
        })
        .catch(error => {
            alert("City not found");
            console.log(error);
        });
}

function displayWeather(data) {

    document.querySelector(".city-name").innerText =
        `${data.name}, ${data.sys.country}`;

    document.querySelector(".temperature").innerHTML =
        `${Math.round(data.main.temp)}°C`;

    document.querySelector(".weather-condition").innerText =
        data.weather[0].main;

    const weather = data.weather[0].main;

    if (weather == "Clear") {
        document.body.style.backgroundImage =
            "url('./img/weather.jpg')";
    }else if (weather == "Clouds") {
        document.body.style.backgroundImage =
            "url('./img/cloud.jpg')";
    }else if (weather == "Rain") {
        document.body.style.backgroundImage =
            "url('./img/rain.jpg')";
    }else if (weather == "Snow") {
        document.body.style.backgroundImage =
            "url('./img/snow.jpg')";
    }
    const icons = {
        Clear: "☀️",
        Clouds: "☁️",
        Rain: "🌧️",
        Drizzle: "🌦️",
        Thunderstorm: "⛈️",
        Snow: "❄️",
        Mist: "🌫️",
        Fog: "🌫️",
        Haze: "🌫️"
    };

    document.querySelector(".weather-icon").innerText =
        icons[weather] || "🌤️";

    document.querySelector(".feels-like").innerText =
        `Feels like ${Math.round(data.main.feels_like)}°C`;

    document.querySelectorAll(".detail-value")[0].innerText =
        `${data.main.humidity}%`;

    document.querySelectorAll(".detail-value")[1].innerText =
        `${(data.wind.speed * 3.6).toFixed(1)} km/h`;

    document.querySelectorAll(".detail-value")[2].innerText =
        `${data.main.pressure} hPa`;

    document.querySelectorAll(".detail-value")[3].innerText =
        `${(data.visibility / 1000).toFixed(1)} km`;

}