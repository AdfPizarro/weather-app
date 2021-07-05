import './style.css';
// import generateLanding from './modules/landing';

const apiKey = '2ea2600b2a9f8c39615a9c6cc9ecc342';
const units = 'metric';

const cityInput = document.getElementById('input');

function draw(data) {
  const resultSection = document.getElementById('resultSection');
  if (data.cod === '404') {
    const location = document.createElement('div');
    const country = document.createElement('div');
    location.setAttribute('class', 'location');
    country.setAttribute('class', 'country');
    location.appendChild(country);
    resultSection.appendChild(location);
    country.innerHTML = 'Select a valid location';
  } else {
    const dataCountry = data.sys.country;
    const dataCity = data.name;
    const dataTemp = Math.round(data.main.temp);
    const dataWeather = data.weather[0].description;

    resultSection.innerHTML = '';

    const location = document.createElement('div');
    const weat = document.createElement('div');
    const tem = document.createElement('div');
    const desc = document.createElement('div');
    const country = document.createElement('div');
    const city = document.createElement('div');

    location.setAttribute('class', 'location');
    weat.setAttribute('class', 'weather');
    tem.setAttribute('class', 'temp');
    desc.setAttribute('class', 'desc');
    country.setAttribute('class', 'country');
    city.setAttribute('class', 'city');

    location.appendChild(country);
    location.appendChild(city);

    weat.appendChild(tem);
    weat.appendChild(desc);

    resultSection.appendChild(location);
    resultSection.appendChild(weat);

    tem.innerHTML = `${dataTemp}°C`;
    country.innerHTML = `${dataCountry} `;
    city.innerHTML = dataCity;
    desc.innerHTML = dataWeather.charAt(0).toUpperCase() + dataWeather.slice(1);
  }
}

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  const response = await fetch(url, { mode: 'cors' });
  const data = await response.json();
  draw(data);
}

cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const city = cityInput.value;
    getWeather(city);
  }
});
