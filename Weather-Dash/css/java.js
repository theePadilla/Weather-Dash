let city = document.querySelector('.weatherCity');
let day = document.querySelector('.weatherDay');

let humidity = document.querySelector('.weatherIndHumidity>.value');
let wind = document.querySelector('.weatherIndWind>.value');
let pressure = document.querySelector('.weatherIndPressure>.value');

let image = document.querySelector('.weatherImage');
let temperature = document.querySelector('.weatherTemperature>.value');

let search = document.querySelector('.weatherSearch');

let weatherAPIKey = '40d911bfa4a4536d8fa209b4a515883e';
let wetherBaseEndpoint = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + weatherAPIKey;

let getWeatherCity = async (city) => {
    let endpoint = wetherBaseEndpoint + '&q=' + city;
    let response = await fetch(endpoint);
    let weather = await response.json();
    return weather;
}

search.addEventListener('keydown', async (e) => {
    if(e.keyCode === 13) {
       let weather = await getWeatherCity(search.value);
       updateCurrentWeather(weather);
    }
})

let updateCurrentWeather = (data) => {
    console.log(data)
    city.textContent = data.name + ', ' + data.sys.country;
    day.textContent = weekDay();
    humidity.textContent = data.main.humidity
    pressure.textContent = data.main.pressure
    
    let windDirection;
    let deg = data.wind.deg;
    if(deg > 45 && deg <= 135) {
        windDirection = 'East'
    } else if(deg < 135 && deg <=225) {
        windDirection = 'South'
    } else if(deg < 225 && deg <=315) {
        windDirection ='West'
    } else if(deg <315 && deg <=45) {
        windDirection ='North'
    }
    wind.textContent = windDirection + ', ' + data.wind.speed;
    temperature.textContent = data.main.temp > 0 ?
                         '+' + Math.round(data.main.temp) : 
                         Math.round(data.main.temp);

}

let weekDay = () => {
    return new Date().toLocaleDateString('en-EN', {'weekday': 'long'});
}

