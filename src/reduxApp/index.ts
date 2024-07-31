import { State } from "./reducer";
import { store } from "./store";
import * as actions from "./actions";
import { getTodos } from "./api";
import {error} from "./actions";

const el = document.querySelector("#app") as HTMLElement;

type RenderData = {
    isLoading: boolean;
    data: any | undefined;
    error: Error | undefined;
};

async function loadData() {
    console.log("click")
    console.log(getTodos())
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

const render = (props: RenderData) => {
    if (props.isLoading) {
        return (el.innerHTML = "Loading....");
    }
    if (props.error) {
        return (el.innerHTML = `<h1 style="color: red">${props.error.message}</h1>`);
    }
    if (props.data) {
        return (el.innerHTML = `<pre>${JSON.stringify(props.data, null, 2)}</pre>`);
    }
    el.innerHTML = `<button>Load data</button>`;
    el.querySelector("button")?.addEventListener("click", loadData);
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
