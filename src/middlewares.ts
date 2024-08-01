import { Middleware } from "redux";

export const loggerMiddleware: Middleware = ({
  dispatch,
  getState
}) => next => action => {
  // Залогируйте состояние до экшена
  console.log(getState());
  // Пустите экшен по цепочке дальше
  const nextAction = next(action);
  // Залогируйте состояние после
  console.log(getState());
  // Верните экшен полученный из цепочки
  return nextAction;
};
