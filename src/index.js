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
  const country=data.sys.country;
  const city=data.name;
  const temp=Math.round(data.main.temp);
  const weather=data.weather[0]["description"];

  console.log(country);
  console.log(city);
  console.log(temp);
  console.log(weather);


}
