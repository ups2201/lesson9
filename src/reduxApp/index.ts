import { State } from "./reducer";
import { store } from "./store";
import {showHistory, showWeather} from "./view.js";
import * as actions from "./actions";
import { getTodos } from "./api";
import {getCitiesFromStorage, getCityFromStorage, setCities} from "./localStorage.js";
import {error} from "./actions";
import "./styles.css";

const el = document.querySelector("#message") as HTMLElement;
const main = document.querySelector("#message") as HTMLElement;

type RenderData = {
    isLoading: boolean;
    data: any | undefined;
    error: Error | undefined;
};

async function loadData() {
    // put your code here
    store.dispatch(actions.loading());
    getTodos()
        .then((data) => {
            store.dispatch(actions.success(data))
        })
        .catch((error) => {
            store.dispatch(actions.error(error))
        })
}

async function loadDataFromHistory() {
    // put your code here
    store.dispatch(actions.loading());
    setCities();
    console.log(getCitiesFromStorage());
    console.log(getCityFromStorage('Vologda'));
    getCitiesFromStorage()
        .then((data) => {
            store.dispatch(actions.success(data))
        })
        .catch((error) => {
            store.dispatch(actions.error(error))
        })
}

const render = (props: RenderData) => {
    if (props.isLoading) {
        return (el.innerHTML = "Loading....");
    }
    if (props.error) {
        return (el.innerHTML = `<h1 style="color: red">${props.error.message}</h1>`);
    }
    if (props.data) {
        showWeather(props.data[0]);
        showHistory();
        return;
    }
    el.innerHTML = `<button>Load data</button>`;
    el.querySelector("button")?.addEventListener("click", loadDataFromHistory);
};

const selectData = (state: State): RenderData => ({
    isLoading: state.isLoading,
    data: state.data,
    error: state.error,
});

console.log(selectData)
console.log(store.getState())

render(selectData(store.getState()));
store.subscribe(() => render(selectData(store.getState())));
