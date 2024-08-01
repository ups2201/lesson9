/**
 * Добавление информации в localStorage
 * @param weather json с информацией о погоде
 */
export function addCityInStorage(weather) {
  //Получаем города из локального хранилища
  let cities;
  if (localStorage.getItem("cities")) {
    cities = JSON.parse(localStorage.getItem("cities"));
  } else {
    cities = [];
  }

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

export async function getCitiesFromStorage() {
  return JSON.parse(localStorage.getItem("cities"));
}

export async function getCityFromStorage(cityName) {
  const cities = JSON.parse(localStorage.getItem("cities"));
  let result = cities.find(
    (cityData) => JSON.parse(cityData).name === cityName,
  );
  return JSON.parse(result);
}
