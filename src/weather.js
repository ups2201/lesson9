// import "./styles.css";

(async function () {
  // Получаем указатели на нужные элементы
  const button = document.querySelector("button");
  const weatherInfoBlock = document.querySelector("#weatherInfo");
  const inputCity = document.querySelector("input");
  const historyBlock = document.querySelector("#history");

  function showWeather(el, weatherInfo) {
    el.innerHTML = `
        <img src="http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png">
        <div>${weatherInfo.name}</div>
        <div>${weatherInfo.main.temp}</div>
    `;

    console.log(weatherInfo.coord.lon);
    console.log(weatherInfo.coord.lat);
    const weatherCityImage = document.querySelector("#weatherCityImage");
    weatherCityImage.innerHTML = `<img src="https://static-maps.yandex.ru/v1?ll=${weatherInfo.coord.lon},${weatherInfo.coord.lat}&lang=ru_RU&size=300,300&z=13&apikey=5caf3d9c-2a6c-4d7f-ac2c-3a3123241fe7">`;
  }

  /**
   * Функция должна делать запрос на
   * https://api.openweathermap.org/data/2.5/weather?units=metric&q={{CITY_NAME}}&appid={{APP_ID}}
   * где
   *  {{CITY_NAME}} должен быть заменен на имя города
   *  {{APP_ID}} должен быть заменен на ключ приложения
   * Запрос возвращает данные в формате JSON
   *
   * функция должна возвращать (Promise) данные с информацией о погоде
   * @param {string} cityName
   */
  async function getWeatherByCityName(cityName) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=7881bfb7be02c74633e5fdee4ff41329`,
      );
      return response.json();
    } catch {
      return { cod: 500, message: `couldn't get weather info` };
    }
  }

  async function getWeatherByCoords(lat, long) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${long}&appid=7881bfb7be02c74633e5fdee4ff41329`,
      );
      return response.json();
    } catch {
      return { cod: 500, message: `couldn't get weather info` };
    }
  }

  function showDefaultCityData() {
    if (!navigator.geolocation) {
      console.log("Ваш браузер не дружит с геолокацией...");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }

    // Если всё хорошо, собираем ссылку
    function success(position) {
      const { longitude, latitude } = position.coords;
      showDefaultWeather(latitude, longitude);
    }

    // Если всё плохо, просто напишем об этом
    function error() {
      console.log("Не получается определить вашу геолокацию :(");
    }
  }

  async function showDefaultWeather(latitude, longitude) {
    const weatherInfo = await getWeatherByCoords(latitude, longitude);
    weatherInfoBlock.innerHTML = `
        <img src="http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png">
        <div>${weatherInfo.name}</div>
        <div>${weatherInfo.main.temp}</div>
    `;
    const weatherCityImage = document.querySelector("#weatherCityImage");
    weatherCityImage.innerHTML = `<img src="https://static-maps.yandex.ru/v1?ll=${longitude},${latitude}&lang=ru_RU&size=300,300&z=13&apikey=5caf3d9c-2a6c-4d7f-ac2c-3a3123241fe7">`;
  }

  document.addEventListener("DOMContentLoaded", showDefaultCityData);

  async function addCity(ev, cityName) {
    // чтобы не перезагружать страницу
    ev.preventDefault();

    if (cityName === undefined) {
      cityName = inputCity.value;
    }

    inputCity.value = "";

    const weather = await getWeatherByCityName(cityName);
    showWeather(weatherInfoBlock, weather);
    addCityInHistory(historyBlock, cityName);
  }

  button.addEventListener("click", async (ev) => {
    // чтобы не перезагружать страницу
    ev.preventDefault();

    const cityName = inputCity.value;
    inputCity.value = "";

    const weather = await getWeatherByCityName(cityName);
    showWeather(weatherInfoBlock, weather);
    addCityInHistory(historyBlock, cityName);
  });

  function addCityInHistory(historyBlock, cityName) {
    const paragraph = document.createElement("p");
    paragraph.innerText = cityName;
    paragraph.className = "font-custom";

    historyBlock.append(paragraph);
    const items = historyBlock.querySelectorAll("p");
    if (items.length > 10) {
      items.item(0).remove();
    }
  }
})();
