import { State } from "./reducer";
import { store } from "./store";
import { viewHistory, showWeather } from "./view";
import { getWeatherByCityName, getWeatherByCoords } from "./apiWeather";
import { showGeo } from "./apiGeo";
import * as actions from "./actions";
import { addCityInStorage, getCityFromStorage } from "./localStorage";
import "./styles.css";

localStorage.setItem("cities", JSON.stringify([]));
const loading = document.querySelector("#loading") as HTMLElement;
document.addEventListener("DOMContentLoaded", showDefaultCityData);

type RenderData = {
  isLoading: boolean;
  currentCity: any;
  error: Error | undefined;
};

function showDefaultCityData() {
  store.dispatch(actions.loading());
  showGeo()
    .then(async (data) => {
      const weatherInfo = await getWeatherByCoords(
        data.latitude,
        data.longitude,
      );
      store.dispatch(actions.success(weatherInfo));
    })
    .catch((error) => {
      store.dispatch(actions.error(error));
    });
}

function getCityWeatherFromApi(ev) {
  return (dispatch: typeof store.dispatch, getState: typeof store.getState) => {
    dispatch(actions.loading());
    // чтобы не перезагружать страницу
    ev.preventDefault();
    const inputCity = document.querySelector("input");
    const cityName = inputCity.value;
    inputCity.value = "";

    getWeatherByCityName(cityName)
      .then((data) => {
        dispatch(actions.success(data));
      })
      .catch((error) => {
        dispatch(actions.error(error));
      });
  };
}

export function getCityWeatherFromHistory(ev) {
  return (dispatch: typeof store.dispatch, getState: typeof store.getState) => {
    dispatch(actions.loading());
    const cityName = ev.target.innerText;
    getCityFromStorage(cityName)
      .then((data) => {
        dispatch(actions.success(data));
      })
      .catch((error) => {
        dispatch(actions.error(error));
      });
  };
}

const render = (props: RenderData) => {
  if (props.isLoading) {
    return (loading.innerHTML = "Loading....");
  }
  if (props.error) {
    return (loading.innerHTML = `<h1 style="color: red">${props.error.message}</h1>`);
  }
  if (props.currentCity) {
    showWeather(props.currentCity);
    addCityInStorage(props.currentCity);
    viewHistory();
    loading.innerHTML = "";
    return;
  }
  document
    .querySelector(".show")
    ?.addEventListener("click", (ev) =>
      store.dispatch(getCityWeatherFromApi(ev) as any),
    );
};

const selectData = (state: State): RenderData => ({
  isLoading: state.isLoading,
  currentCity: state.currentCity,
  error: state.error,
});

render(selectData(store.getState()));
store.subscribe(() => render(selectData(store.getState())));
