import "./styles.css";
import { showGeo } from "./apiGeo";
import { getWeatherByCityName, getWeatherByCoords } from "./apiWeather";
import { addCityInStorage } from "./localStorage";
import "./router";

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
    showGeo().then(success, error);

    // Если всё хорошо, собираем ссылку
    async function success(position) {
      let weatherInfo;
      if (position.city !== "") {
        weatherInfo = await getWeatherByCityName(position.city);
      } else {
        weatherInfo = await getWeatherByCoords(
          position.latitude,
          position.longitude,
        );
      }
      addCityInStorage(weatherInfo);
      showWeather(weatherInfoBlock, weatherInfo);
      showHistory(historyBlock);
    }

    // Если всё плохо, просто напишем об этом
    function error() {
      alert("Не получается определить вашу геолокацию :(");
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
        <div>${weatherDataJson.main.temp} °C</div>
    `;
    const weatherCityImage = document.querySelector("#weatherCityImage");
    weatherCityImage.innerHTML = `<img src="https://static-maps.yandex.ru/v1?ll=${weatherDataJson.coord.lon},${weatherDataJson.coord.lat}&lang=ru_RU&size=300,300&z=13&apikey=5caf3d9c-2a6c-4d7f-ac2c-3a3123241fe7">`;
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
   * Отображение погоды в городе из истории (из localStorage)
   *
   * @param ev
   */
  async function showCityDataFromHistory(ev) {
    // чтобы не перезагружать страницу
    ev.preventDefault();

    const weather = await getWeatherByCityName(this.innerText);
    if (weather.cod === 200) {
      showWeather(weatherInfoBlock, weather);
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
      console.log("showCityDataFromHistory");
      paragraph.addEventListener("click", showCityDataFromHistory);
      historyBlock.append(paragraph);
    });
  }

  localStorage.setItem("cities", JSON.stringify([]));
})();
