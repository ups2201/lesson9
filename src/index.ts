import { State } from "./reducer";
import { store } from "./store";
import {showHistory, showWeather} from "./view.js";
import {getWeatherByCityName, getWeatherByCoords} from "./apiWeather.js";
import {showGeo} from "./apiGeo.js";
import * as actions from "./actions";
import {addCityInStorage, getCityFromStorage} from "./localStorage.js";
import "./styles.css";

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
            let weatherInfo = await getWeatherByCoords(
                data.latitude,
                data.longitude,
            );
            store.dispatch(actions.success(weatherInfo));
        })
        .catch((error) => {
            store.dispatch(actions.error(error));
        });
}

async function showCityFromApi(ev) {
    store.dispatch(actions.loading());
    // чтобы не перезагружать страницу
    ev.preventDefault();
    let inputCity = document.querySelector("input");
    let cityName;
    if (cityName === undefined) {
        cityName = inputCity.value;
    }
    inputCity.value = "";

    getWeatherByCityName(cityName)
        .then((data) => {
            store.dispatch(actions.success(data));
        })
        .catch((error) => {
            store.dispatch(actions.error(error));
        });
}

async function loadDataFromHistory(ev) {
    store.dispatch(actions.loading());
    const cityName = ev.target.innerText;
    getCityFromStorage(cityName)
        .then((data) => {
            store.dispatch(actions.success(data))
        })
        .catch((error) => {
            store.dispatch(actions.error(error))
        });
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
        showHistory(loadDataFromHistory);
        loading.innerHTML = "";
        return;
    }
    document.querySelector(".show")?.addEventListener("click", showCityFromApi);
};

const selectData = (state: State): RenderData => ({
    isLoading: state.isLoading,
    currentCity: state.currentCity,
    error: state.error,
});

render(selectData(store.getState()));
store.subscribe(() => render(selectData(store.getState())));
