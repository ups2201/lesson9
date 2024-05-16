const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;

  console.log("Ваше текущее местоположение:");
  console.log(`Широта: ${crd.latitude}`);
  console.log(`Долгота: ${crd.longitude}`);
  console.log(`Плюс-минус ${crd.accuracy} метров.`);

  // document.addEventListener("DOMContentLoaded", async (ev) => {
  //     // чтобы не перезагружать страницу
  //     ev.preventDefault();
  //
  //     const weatherCityImage = document.querySelector("#weatherCityImage")
  //     weatherCityImage.innerHTML = `<img src="https://static-maps.yandex.ru/v1?ll=${crd.longitude},${crd.latitude}&lang=ru_RU&size=300,300&z=13&apikey=5caf3d9c-2a6c-4d7f-ac2c-3a3123241fe7">`
  // });

  return crd;
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function getCoords() {
  return navigator.geolocation.getCurrentPosition(success, error, options);
}
