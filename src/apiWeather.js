const urlOpenWeather =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=7881bfb7be02c74633e5fdee4ff41329";
/**
 * Функция возвращает (Promise) данные с информацией о погоде
 *
 * https://api.openweathermap.org/data/2.5/weather?units=metric&q={{CITY_NAME}}&appid={{APP_ID}}
 * Запрос возвращает данные в формате JSON
 *
 * @param {string} cityName имя города
 */
export async function getWeatherByCityName(cityName) {
  try {
    const response = await fetch(`${urlOpenWeather}&q=${cityName}`);
    return response.json();
  } catch {
    return { cod: 500, message: `couldn't get weather info` };
  }
}

/**
 * Функция возвращает (Promise) данные с информацией о погоде
 *
 * https://api.openweathermap.org/data/2.5/weather?units=metric&lat={{lat}}&lon={{long}}&appid={{APP_ID}}
 * Запрос возвращает данные в формате JSON
 *
 * @param {number} lat координата
 * @param {number} long координата
 */
export async function getWeatherByCoords(lat, long) {
  try {
    const response = await fetch(`${urlOpenWeather}&lat=${lat}&lon=${long}`);
    return response.json();
  } catch {
    return { cod: 500, message: `couldn't get weather info` };
  }
}
