import "./styles.css";
import { showGeo } from "./apiGeo";
import { getWeatherByCityName, getWeatherByCoords } from "./apiWeather";
import { addCityInStorage } from "./localStorage";
// import "./router";
// import {router, state} from "./router";
import {RouterFactory, RouterMode} from "@amishurinskiy/router/dist/RouterFactory";

// const weatherInfoBlock = document.querySelector("#weatherInfo");
export let state = {
  currentHeaderPage: "Главная страница, по умолчанию отображается погода в текущем городе",
  cityCurrent: false,
  historyCity: [],
  isAboutShow: false,
  isMainFormShow: true,
  isHistoryShow: true,
};

(async function () {
// Получаем указатели на нужные элементы
  const button = document.querySelector("button");
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
      if (weatherInfo.cod === 200) {
        addCityInStorage(weatherInfo);
        showWeather(weatherInfo);
        showHistory(historyBlock);
      }
    }

    // Если всё плохо, просто напишем об этом
    function error() {
      alert("Не получается определить вашу геолокацию :(");
    }
  }



  /**
   * Функция для отображение информации о погоде в введеном городе
   *
   * @param ev
   * @param {string} cityName имя города
   */
  async function showNewCityData(ev, cityName) {
    console.log("showNewCityData")
    // чтобы не перезагружать страницу
    ev.preventDefault();

    if (cityName === undefined) {
      cityName = inputCity.value;
    }

    inputCity.value = "";

    const weather = await getWeatherByCityName(cityName);
    if (weather.cod === 200) {
      // document.querySelector("#main").hidden = !state.isMainFormShow;
      // document.querySelector("#about").hidden = !state.isAboutShow;
      // document.querySelector("#historyBlock").hidden = !state.isHistoryShow;
      // document.querySelector("#message").innerHTML =
      //     `<h2>${state.currentHeaderPage}</h2>`;

      state.cityCurrent = weather;
      addCityInStorage(weather);
      showWeather(weather);
      showHistory(historyBlock);
      router.go(cityName, state);
    }
  }

  /**
   * Отображение погоды в городе из истории (из localStorage)
   *
   * @param ev
   */
  async function showCityDataFromHistory(event) {
    if (!event.target.matches("p")) {
      return;
    }
    event.preventDefault();
    const url = event.target.innerHTML;

    const weather = await getWeatherByCityName(this.innerText);
    if (weather.cod === 200) {
      showCityWeatherPage();
      state.cityCurrent = weather;
      showWeather(weather);
    }
    router.go(url, state);
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


/**
 * Отображение информции о погоде в городе
 *
 * @param weatherInfoBlock элемент информации о погоде
 * @param weatherDataJson json с данными о погоде
 */
function showWeather(weatherDataJson) {
  console.log("showWeather");
  console.log(weatherDataJson);
  console.log(weatherDataJson.weather[0].icon);
  state.cityCurrent = weatherDataJson;
  document.querySelector("#weatherInfo").innerHTML = `
        <img src="http://openweathermap.org/img/wn/${weatherDataJson.weather[0].icon}@2x.png">
        <div>${weatherDataJson.name}</div>
        <div>${weatherDataJson.main.temp} °C</div>
    `;
  const weatherCityImage = document.querySelector("#weatherCityImage");
  weatherCityImage.innerHTML = `<img src="https://static-maps.yandex.ru/v1?ll=${weatherDataJson.coord.lon},${weatherDataJson.coord.lat}&lang=ru_RU&size=300,300&z=13&apikey=5caf3d9c-2a6c-4d7f-ac2c-3a3123241fe7">`;
}

function showAboutPage() {
  state.currentHeaderPage = "Это приложение из ДЗ - https://github.com/vvscode/otus--javascript-basic/blob/master/lessons/lesson40/hw.md";
  state.isMainFormShow = false;
  state.isHistoryShow = false;
  state.isAboutShow = true;
  render();
}

function showMainPage() {
  state.currentHeaderPage = "Главная страница, по умолчанию отображается погода в текущем городе";
  state.isMainFormShow = true;
  state.isHistoryShow = true;
  state.isAboutShow = false;
  render();
}

function showCityWeatherPage() {
  console.log("showCityWeatherPage")
  state.currentHeaderPage = "Страница о погоде в городе, который выбрали из истории";
  state.isMainFormShow = true;
  state.isHistoryShow = true;
  state.isAboutShow = false;
  showWeather(history.state.cityCurrent);
  render();
}

function render() {
  document.querySelector("#main").hidden = !state.isMainFormShow;
  document.querySelector("#about").hidden = !state.isAboutShow;
  document.querySelector("#historyBlock").hidden = !state.isHistoryShow;
  document.querySelector("#message").innerHTML = `<h2>${state.currentHeaderPage}</h2>`;
  console.log(state)
}

const router = new RouterFactory().create(RouterMode.HISTORY_API);

const route0 = {
  match: "/",
  onEnter: showMainPage,
};
router.addRoute(route0);

const route1 = {
  match: "/about",
  onEnter: showAboutPage,
};
router.addRoute(route1);

const route2 = {
  match: (path) => {
    console.log("path");
    console.log(path);
    console.log("route2");
    console.log(JSON.parse(localStorage.getItem("cities"))
        .map((city) => JSON.parse(city).name)
        .includes(path.replace("/", "")));

    return JSON.parse(localStorage.getItem("cities"))
        .map((city) => JSON.parse(city).name)
        .includes(path.replace("/", ""));
  },
  onEnter: showCityWeatherPage,
};
router.addRoute(route2);

// document.body.addEventListener("click", (event) => {
//   if (!event.target.matches("p")) {
//     return;
//   }
//   event.preventDefault();
//   const url = event.target.innerHTML;
//   router.go(url, state);
// });

document.body.addEventListener("click", (event) => {
  if (!event.target.matches("a")) {
    return;
  }
  event.preventDefault();
  const url = event.target.href;
  router.go(url, state);
});

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
});

})();