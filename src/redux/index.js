import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  currentUrl: "/",
  currentHeaderPage:
    "Главная страница, по умолчанию отображается погода в текущем городе",
  cityCurrent: undefined,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_NEW_CITY": {
      const newState = structuredClone(state);
      newState.cityCurrent = action.payload;
      //midleware добавить в localstorage
      return newState;
    }
    case "SHOW_CITY_IN_HISTORY": {
      const newState = structuredClone(state);
      newState.cityCurrent = action.payload;
      //midleware получить из localstorage
      return newState;
    }
    case "SWITCH_ABOUT_PAGE": {
      const newState = structuredClone(state);
      newState.currentUrl = "/about";
      // newState.isAboutShow = true;
      // newState.isMainFormShow = false;
      // newState.isHistoryShow = false;
      return newState;
    }
    case "SWITCH_MAIN_PAGE": {
      const newState = structuredClone(state);
      newState.currentUrl = "/";
      // newState.isMainFormShow = true;
      // newState.isHistoryShow = true;
      // newState.isAboutShow = false;
      return newState;
    }
    case "SWITCH_CITY_PAGE": {
      const newState = structuredClone(state);
      newState.currentUrl = "/" + state.cityCurrent.name;
      // newState.isMainFormShow = true;
      // newState.isHistoryShow = true;
      // newState.isAboutShow = false;
      return newState;
    }
    default:
      return state;
  }
}

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers({
      autoBatch: false,
    }).concat(batchedSubscribe(debounceNotify)),
});
