/**
 * Добавление информации в localStorage
 * @param weather json с информацией о погоде
 */
export function addCityInStorage(weather) {
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

export function getCitiesFromStorage() {
  return JSON.parse(localStorage.getItem("cities"));
}

export function getCityFromStorage(cityName) {
  return JSON.parse(localStorage.getItem("cities")).find(
    (cityData) => cityData.name === cityName,
  );
}
