import './style.css';
//import generateLanding from './modules/landing';

const apiKey = "2ea2600b2a9f8c39615a9c6cc9ecc342";
let units="metric";

const cityInput = document.getElementById('input');


cityInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      let city = cityInput.value;
       getWeather(city);
    }
});




async function getWeather(city) {
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
   const response = await fetch(url, {mode: 'cors'});
   const data = await response.json();
   console.log(data);
   draw(data);
}



function draw(data){
  const result_section = document.getElementById('result_section');
  if (data.cod=="404"){
    const location = document.createElement('div');
    const country = document.createElement('div');
    location.setAttribute('class', 'location');
    country.setAttribute('class', 'country');
    location.appendChild(country);
    result_section.appendChild(location);
    country.innerHTML = "Select a valid location";

  }else {
    const data_country=data.sys.country;
    const data_city=data.name;
    const data_temp=Math.round(data.main.temp);
    const data_weather=data.weather[0]["description"];




    result_section.innerHTML="";

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

    result_section.appendChild(location);
    result_section.appendChild(weat);




    tem.innerHTML = data_temp+"°"+"C";
    country.innerHTML = data_country+" ";
    city.innerHTML = data_city;
    desc.innerHTML = data_weather.charAt(0).toUpperCase() + data_weather.slice(1);;

  }



}
