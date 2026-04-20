const apiKey = API_KEY;

async function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const res = await fetch(url);

        if (!res.ok) throw new Error("City not found");

        const data = await res.json();

        showWeather(data);

    } catch (err) {
        document.getElementById("weatherBox").innerHTML =
            `<p style="color:#ffb4b4;">${err.message}</p>`;
    }
}

function showWeather(data) {
    const box = document.getElementById("weatherBox");

    box.innerHTML = `
        <div class="city">${data.name}</div>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        <div class="temp">${data.main.temp}°C</div>
        <p>${data.weather[0].description}</p>

        <div class="details">
            <span>💧 ${data.main.humidity}%</span>
            <span>🌬 ${data.wind.speed} km/h</span>
        </div>
    `;
}