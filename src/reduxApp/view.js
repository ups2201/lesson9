import { getCitiesFromStorage } from "./localStorage";

export function showWeather(weatherDataJson) {
  document.querySelector("#weatherInfo").innerHTML = `
        <img src="http://openweathermap.org/img/wn/${weatherDataJson.weather[0].icon}@2x.png">
        <div>${weatherDataJson.name}</div>
        <div>${weatherDataJson.main.temp} °C</div>
    `;
  const weatherCityImage = document.querySelector("#weatherCityImage");
  weatherCityImage.innerHTML = `<img src="https://static-maps.yandex.ru/v1?ll=${weatherDataJson.coord.lon},${weatherDataJson.coord.lat}&lang=ru_RU&size=300,300&z=13&apikey=5caf3d9c-2a6c-4d7f-ac2c-3a3123241fe7">`;
}

export function showHistory() {
  let PREFIX = "";

  document.querySelectorAll(".cityHistory").forEach((e) => e.remove());
  let citiesPromise = getCitiesFromStorage()
    .then((cities) => {
      const historyBlock = document.querySelector("#history");
      console.log(cities);
      cities.forEach((city) => {
        city = JSON.parse(city);
        console.log(city);
        const paragraph = document.createElement("a");
        paragraph.classList.add("font-custom");
        paragraph.classList.add("cityHistory");
        paragraph.innerText = city.name;
        paragraph.href = PREFIX + "/" + city.name;
        // paragraph.addEventListener("click", showCityDataFromHistory);
        historyBlock.append(paragraph);
      });
    })
    .catch(() => console.log("error"));
}
