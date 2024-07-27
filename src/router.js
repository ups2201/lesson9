import {
  RouterFactory,
  RouterMode,
} from "@amishurinskiy/router/dist/RouterFactory";

const render = (content) =>
  (document.getElementById("root").innerHTML = `<h2>${content}</h2>`);

const createLogger =
  (content, shouldRender = true) =>
  (...args) => {
    console.log(`LOGGER: ${content} args=${JSON.stringify(args)}`);
    if (shouldRender) {
      render(content);
    }
  };

const router = new RouterFactory().create(RouterMode.HISTORY_API);

const route0 = {
  match: "/",
  onEnter: createLogger("/"),
};
router.addRoute(route0);

const route1 = {
  match: "/about",
  onEnter: createLogger("/about"),
};
router.addRoute(route1);

const route2 = {
  match: "/weather",
  onEnter: createLogger("/weather"),
};
router.addRoute(route2);

document.body.addEventListener("click", (event) => {
  if (!event.target.matches("p")) {
    return;
  }
  event.preventDefault();
  const url = event.target.innerHTML;
  router.go(url, { url });
  // unsubscribe();
});

document.body.addEventListener("click", (event) => {
  if (!event.target.matches("a")) {
    return;
  }
  event.preventDefault();
  const url = event.target.href;
  router.go(url, { url });
  // unsubscribe();
});
