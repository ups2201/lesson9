(async function () {
  // Получаем указатели на нужные элементы
  const button = document.querySelector("button");
  const weatherInfoBlock = document.querySelector("#weatherInfo");
  const inputCity = document.querySelector("input");
  const historyBlock = document.querySelector("#history");

  //Загружаем данные по текущему местоположению
  document.addEventListener("DOMContentLoaded", showDefaultCityData);

  //Отображение данных по введённому городу
  button.addEventListener("click", showNewCityData);

  /**
   * Функция для отображения информции о погоде в текущем местоположении
   */
  function showDefaultCityData() {
    if (!navigator.geolocation) {
      console.log("Ваш браузер не дружит с геолокацией...");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }

    // Если всё хорошо, собираем ссылку
    async function success(position) {
      const { longitude, latitude } = position.coords;
      const weatherInfo = await getWeatherByCoords(latitude, longitude);

      showWeather(weatherInfoBlock, weatherInfo);
    }

    // Если всё плохо, просто напишем об этом
    function error() {
      console.log("Не получается определить вашу геолокацию :(");
    }
  }

  /**
   * Отображение информции о погоде в городе
   *
   * @param weatherInfoBlock элемент информации о погоде
   * @param weatherDataJson json с данными о погоде
   */
  function showWeather(weatherInfoBlock, weatherDataJson) {
    weatherInfoBlock.innerHTML = `
        <img src="http://openweathermap.org/img/wn/${weatherDataJson.weather[0].icon}@2x.png">
        <div>${weatherDataJson.name}</div>
        <div>${weatherDataJson.main.temp}</div>
    `;
    const weatherCityImage = document.querySelector("#weatherCityImage");
    weatherCityImage.innerHTML = `<img src="https://static-maps.yandex.ru/v1?ll=${weatherDataJson.coord.lon},${weatherDataJson.coord.lat}&lang=ru_RU&size=300,300&z=13&apikey=5caf3d9c-2a6c-4d7f-ac2c-3a3123241fe7">`;
  }

  /**
   * Функция возвращает (Promise) данные с информацией о погоде
   *
   * https://api.openweathermap.org/data/2.5/weather?units=metric&q={{CITY_NAME}}&appid={{APP_ID}}
   *  {{CITY_NAME}} имя города
   *  {{APP_ID}} на ключ приложения
   * Запрос возвращает данные в формате JSON
   *
   * @param {string} cityName имя города
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

  /**
   * Функция возвращает (Promise) данные с информацией о погоде
   *
   * https://api.openweathermap.org/data/2.5/weather?units=metric&q={{CITY_NAME}}&appid={{APP_ID}}
   *  {{CITY_NAME}} имя города
   *  {{APP_ID}} на ключ приложения
   * Запрос возвращает данные в формате JSON
   *
   * @param {number} lat координата
   * @param {number} long координата
   */
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

  /**
   * Функция для отображение информации о погоде в введеном городе
   *
   * @param ev
   * @param {string} cityName имя города
   */
  async function showNewCityData(ev, cityName) {
    // чтобы не перезагружать страницу
    ev.preventDefault();

    if (cityName === undefined) {
      cityName = inputCity.value;
    }

    inputCity.value = "";

    const weather = await getWeatherByCityName(cityName);
    if (weather.cod === 200) {
      addCityInStorage(weather);
      showWeather(weatherInfoBlock, weather);
      showHistory(historyBlock);
    }
  }

  /**
   * Функция для добавления информации в историю
   *
   * @param historyBlock элемент для отображения истории
   * @param {string} cityName имя горожа
   */
  function showHistory(historyBlock) {
    let cities = JSON.parse(localStorage.getItem("cities"));

    document.querySelectorAll("p").forEach((e) => e.remove());

    cities.forEach((city) => {
      const paragraph = document.createElement("p");
      paragraph.innerText = JSON.parse(city).name;
      paragraph.className = "font-custom";
      historyBlock.append(paragraph);
    });
  }

  localStorage.setItem("cities", JSON.stringify([]));

  function addCityInStorage(weather) {
    //Получаем города из локального хранилища
    let cities = JSON.parse(localStorage.getItem("cities"));

    //Если уже есть такой город, то удаляем его
    for (let i = 0; i < cities.length; i++) {
      if (JSON.parse(cities[i]).name === weather.name) {
        cities.splice(i, 1);
      }
    }

    //Добавляем новый город
    cities.push(JSON.stringify(weather));

    //Оставляем только 10 последних городов
    if (cities.length > 10) {
      cities = cities.slice(-10);
    }

    localStorage.setItem("cities", JSON.stringify(cities));
  }
})();
