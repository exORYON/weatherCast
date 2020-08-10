let weatherContainer, weatherInfo, section, request, requestURL, city, alertSuccess, alertContainer, result, br, dotsCounter;
let interval = setInterval(dotsUpdater, 1000);
const API_key = '10cc54419fe99e60c1fd5c08247978a4';

alertContainer = document.getElementById('alert-container');
city = document.getElementById('search-input').value = 'Ирпень';
headerText = document.getElementById('secondary-text');
weatherContainer = document.getElementById('weatherResult');
br = document.createElement('br');
dotsCounter = 0;

function cityChange() {
    city = document.getElementById('search-input').value;
}

function discoverWeather() {
    clearInterval(interval);
    // weatherContainer.style.paddingTop = 25 + 'px';
    weatherContainer.style.top = -5 + '%';
    weatherContainer.style.width = 350 + 'px';
    weatherContainer.style.height = 450 + 'px';
    weatherContainer.style.flexDirection = 'column';
    weatherContainer.style.justifyContent = 'flex-start';
    requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`;
    request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        result = request.response;
        alertSuccess = document.createElement('div');
        alertContainer.append(alertSuccess);
        alertSuccess.classList.add('alert-success');
        let alert = document.querySelector('.alert-success');
        alert.innerHTML = 'Погода успешно загружена';
        setTimeout(deleteAlert, 4000);
        weatherContainer.innerHTML = `
            <h5 style="position: relative; margin-top: 15px">Текущая погода в городе <span class="text-primary">${city}</span></h5><br>
                Текущая температура: ${result.main.temp}° <br>
                Ощущается как: ${result.main.feels_like}° <br><br>
                Минимальная температура за день: ${result.main.temp_min}° <br>
                Максимальная температура за день: ${result.main.temp_max}° <br><br>
                Текущее давление: ${result.main.pressure} гектоПаскалей<br>
                Влажность: ${result.main.humidity}% <br>
                Видимость: ${result.visibility} метров <br><br>
                Скорость ветра: ${result.wind.speed} м/с <br>
                Облачность: ${result.clouds.all}% <br><br>
                <h6>Данные, согласно с сайтом Weather Map</h6>
        `;
    }

    function deleteAlert() {
        let alert = document.querySelector('.alert-success');
        alert.remove();
        // alertContainer.append(br);
    }

    headerText.innerHTML = `Погода в городе ${city}`;
}

function dotsUpdater() {
    switch(dotsCounter) {
        case 0:
        weatherContainer.innerHTML += '.';
        dotsCounter++;
        break;
            case 1:
            weatherContainer.innerHTML += '.';
            dotsCounter++;
            break;
        case 2:
        weatherContainer.innerHTML += '.';
        dotsCounter++;
        break;
            case 3:
            weatherContainer.innerHTML = 'Укажите свой город';
            dotsCounter = 0;
            break;
    }
}