import { State } from "./reducer";
import { store } from "./store";
import {showHistory, showWeather} from "./view.js";
import {getWeatherByCityName, getWeatherByCoords} from "./../apiWeather.js";
import {showGeo} from "./../apiGeo.js";
import * as actions from "./actions";
import { getTodos } from "./api";
import {addCityInStorage, getCitiesFromStorage, getCityFromStorage, setCities} from "./localStorage.js";
import {error} from "./actions";
import "./styles.css";

const el = document.querySelector("#message") as HTMLElement;
const main = document.querySelector("#message") as HTMLElement;
document.addEventListener("DOMContentLoaded", showDefaultCityData);


type RenderData = {
    isLoading: boolean;
    currentCity: any;
    error: Error | undefined;
};

function showDefaultCityData() {
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

async function show() {
    // чтобы не перезагружать страницу
    // ev.preventDefault();
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

async function loadDataFromHistory() {
    // put your code here
    store.dispatch(actions.loading());
    // setCities();
    getCityFromStorage('Vologda')
        .then((data) => {
            store.dispatch(actions.success(data))
        })
        .catch((error) => {
            store.dispatch(actions.error(error))
        });
}

const render = (props: RenderData) => {
    if (props.isLoading) {
        return (el.innerHTML = "Loading....");
    }
    if (props.error) {
        return (el.innerHTML = `<h1 style="color: red">${props.error.message}</h1>`);
    }
    if (props.currentCity) {
        console.log(props.currentCity)
        showWeather(props.currentCity);
        addCityInStorage(props.currentCity);
        showHistory();
        return;
    }
    el.innerHTML = `<button>Load data</button>`;
    // el.querySelector("button")?.addEventListener("click", loadDataFromHistory);
    document.querySelector(".show")?.addEventListener("click", show);
};

const selectData = (state: State): RenderData => ({
    isLoading: state.isLoading,
    currentCity: state.currentCity,
    error: state.error,
});

console.log(selectData)
console.log(store.getState())

render(selectData(store.getState()));
store.subscribe(() => render(selectData(store.getState())));
