const apiKey = API_KEY;

// Get weather by city
async function getWeather() {
    const city = document.getElementById("cityInput").value;
    fetchWeather(city);
}

// Auto location
function getLocationWeather() {
    navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        fetchWeatherByCoords(lat, lon);
    });
}

// Fetch by city
async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    showCurrent(data);

    fetchForecast(data.coord.lat, data.coord.lon);
}

// Fetch by coords
async function fetchWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    showCurrent(data);

    fetchForecast(lat, lon);
}

// Show current
function showCurrent(data) {
    document.getElementById("currentWeather").innerHTML = `
        <h3>${data.name}</h3>
        <h1>${data.main.temp}°C</h1>
        <p>${data.weather[0].main}</p>
    `;
}

// 5-day forecast
async function fetchForecast(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    const forecast = document.getElementById("forecast");
    forecast.innerHTML = "";

    // Every 8th item = next day
    data.list.filter((_, i) => i % 8 === 0).forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        const date = new Date(item.dt_txt).toLocaleDateString();

        card.innerHTML = `
            <p>${date}</p>
            <p>${item.main.temp}°C</p>
        `;

        forecast.appendChild(card);
    });
}

// Dark mode
function toggleTheme() {
    document.body.classList.toggle("dark");

    const btn = document.getElementById("themeBtn");

    if (document.body.classList.contains("dark")) {
        btn.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        btn.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
}

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    document.getElementById("themeBtn").textContent = "☀️";
}
