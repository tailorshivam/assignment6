const API_KEY = 'YOUR_API_KEY';
const cities = ['Mumbai', 'Delhi', 'London', 'New York', 'Tokyo'];
let currentCity = cities[Math.floor(Math.random() * cities.length)];

const el = {
  temp: document.getElementById('temp'),
  humidity: document.getElementById('humidity'),
  wind: document.getElementById('wind'),
  icon: document.getElementById('icon'),
  sunrise: document.getElementById('sunrise'),
  sunset: document.getElementById('sunset'),
  refresh: document.getElementById('refresh'),
  cityLabel: document.getElementById('city'),
  cityButtons: document.querySelectorAll('.city-btn'),
};

function convertUnixToTime(unix, offset) {
  const date = new Date((unix + offset) * 1000);
  return date.toUTCString().slice(-12, -7);
}

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    el.temp.textContent = data.main.temp.toFixed(1);
    el.humidity.textContent = data.main.humidity;
    el.wind.textContent = data.wind.speed;
    el.icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    el.icon.alt = data.weather[0].description;

    const tz = data.timezone;
    el.sunrise.textContent = convertUnixToTime(data.sys.sunrise, tz);
    el.sunset.textContent = convertUnixToTime(data.sys.sunset, tz);
    el.cityLabel.textContent = city;

    highlightActiveCity(city);
  } catch (err) {
    alert('Failed to fetch weather data. Please try again.');
    console.error(err);
  }
}

function highlightActiveCity(city) {
  el.cityButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.city === city);
  });
}

el.refresh.addEventListener('click', () => fetchWeather(currentCity));

el.cityButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    currentCity = btn.dataset.city;
    fetchWeather(currentCity);
  });
});


fetchWeather(currentCity);
