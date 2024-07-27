import {
  RouterFactory,
  RouterMode,
} from "@amishurinskiy/router/dist/RouterFactory";

export let state = {
  currentHeaderPage: "Main Page",
  cityCurrent: "",
  historyCity: [],
  isAboutShow: false,
  isMainFormShow: true,
  isHistoryShow: false,
};

const render = () => {
  document.querySelector("#main").hidden = !state.isMainFormShow;
  document.querySelector("#about").hidden = !state.isAboutShow;
  document.querySelector("#historyBlock").hidden = !state.isHistoryShow;
  document.querySelector("#message").innerHTML =
    `<h2>${state.currentHeaderPage}</h2>`;
};
render(state);

const router = new RouterFactory().create(RouterMode.HISTORY_API);

const route0 = {
  match: "/",
  onEnter: () => {
    state.isMainFormShow = true;
    state.isAboutShow = false;
    state.currentHeaderPage = "Main Page";
    state.isHistoryShow = false;
    render();
  },
};
router.addRoute(route0);

const route1 = {
  match: "/about",
  onEnter: () => {
    state.isMainFormShow = false;
    state.isAboutShow = true;
    state.isHistoryShow = false;
    state.currentHeaderPage = "About Page";
    render();
  },
};
router.addRoute(route1);

const route2 = {
  match: (path) => {
    return JSON.parse(localStorage.getItem("cities"))
      .map((city) => JSON.parse(city).name)
      .includes(path.replace("/", ""));
  },
  onEnter: () => {
    state.isMainFormShow = true;
    state.isAboutShow = false;
    state.isHistoryShow = true;
    state.currentHeaderPage = "Weather Page";
    render();
  },
};
router.addRoute(route2);

document.body.addEventListener("click", (event) => {
  if (!event.target.matches("p")) {
    return;
  }
  event.preventDefault();
  state.cityCurrent = event.target.innerHTML;
  const url = event.target.innerHTML;
  router.go(url, { url });
});

document.querySelector("button").addEventListener("click", (event) => {
  state.cityCurrent = document.querySelector("input").value;
  const url = state.cityCurrent;
  router.go(url, { url });
});

document.body.addEventListener("click", (event) => {
  if (!event.target.matches("a")) {
    return;
  }
  event.preventDefault();
  const url = event.target.href;
  router.go(url, { url });
});
