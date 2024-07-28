import {
  RouterFactory,
  RouterMode,
} from "@amishurinskiy/router/dist/RouterFactory";
import {showAboutPage, showCityWeatherPage, showMainPage, showWeather} from "./main";
// import {showWeather} from "./main";

// export const router = new RouterFactory().create(RouterMode.HISTORY_API);
//
// const route0 = {
//   match: "/",
//   onEnter: showMainPage,
// };
// router.addRoute(route0);
//
// const route1 = {
//   match: "/about",
//   onEnter: showAboutPage,
// };
// router.addRoute(route1);
//
// const route2 = {
//   match: (path) => {
//     return JSON.parse(localStorage.getItem("cities"))
//       .map((city) => JSON.parse(city).name)
//       .includes(path.replace("/", ""));
//   },
//   onEnter: showCityWeatherPage,
// };
// router.addRoute(route2);

// document.body.addEventListener("click", (event) => {
//   if (!event.target.matches("p")) {
//     return;
//   }
//   event.preventDefault();
//   // state.cityCurrent = event.target.innerHTML;
//   const url = event.target.innerHTML;
//   router.go(url, state);
// });
//
// // document.querySelector("button").addEventListener("click", (event) => {
// //   // state.cityCurrent = document.querySelector("input").value;
// //   const url = document.querySelector("input").value;
// //
// //   router.go(url, state);
// // });
//
// document.body.addEventListener("click", (event) => {
//   if (!event.target.matches("a")) {
//     return;
//   }
//   event.preventDefault();
//   const url = event.target.href;
//   router.go(url, state);
// });
//
// document.querySelector("form").addEventListener("submit", (event) => {
//   event.preventDefault();
// });
