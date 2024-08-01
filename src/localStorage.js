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

export function setCities() {
  localStorage.setItem("cities", JSON.stringify(history));
}

const history = [
  {
    coord: { lon: 39.8886, lat: 59.2187 },
    weather: [
      { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
    ],
    base: "stations",
    main: {
      temp: 18.23,
      feels_like: 17.75,
      temp_min: 18.23,
      temp_max: 18.23,
      pressure: 1011,
      humidity: 63,
      sea_level: 1011,
      grnd_level: 995,
    },
    visibility: 10000,
    wind: { speed: 1.53, deg: 76, gust: 1.34 },
    clouds: { all: 0 },
    dt: 1722141626,
    sys: { country: "RU", sunrise: 1722128275, sunset: 1722189343 },
    timezone: 10800,
    id: 472459,
    name: "Vologda",
    cod: 200,
  },
  {
    coord: { lon: 37.6156, lat: 55.7522 },
    weather: [
      { id: 802, main: "Clouds", description: "scattered clouds", icon: "03d" },
    ],
    base: "stations",
    main: {
      temp: 19.31,
      feels_like: 18.81,
      temp_min: 18.75,
      temp_max: 19.49,
      pressure: 1013,
      humidity: 58,
      sea_level: 1013,
      grnd_level: 995,
    },
    visibility: 10000,
    wind: { speed: 4.13, deg: 281, gust: 6.67 },
    clouds: { all: 27 },
    dt: 1722141171,
    sys: {
      type: 1,
      id: 9027,
      country: "RU",
      sunrise: 1722130069,
      sunset: 1722188641,
    },
    timezone: 10800,
    id: 524901,
    name: "Moscow",
    cod: 200,
  },
  {
    coord: { lon: 28.3496, lat: 57.8136 },
    weather: [
      { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
    ],
    base: "stations",
    main: {
      temp: 18.95,
      feels_like: 19.04,
      temp_min: 18.95,
      temp_max: 18.95,
      pressure: 1014,
      humidity: 82,
      sea_level: 1014,
      grnd_level: 1008,
    },
    visibility: 10000,
    wind: { speed: 1, deg: 0 },
    clouds: { all: 0 },
    dt: 1722141850,
    sys: {
      type: 1,
      id: 8928,
      country: "RU",
      sunrise: 1722131593,
      sunset: 1722191564,
    },
    timezone: 10800,
    id: 504341,
    name: "Pskov",
    cod: 200,
  },
];
