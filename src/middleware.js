import { setToken } from "./agent";

const isPromise = value => {
  return value && typeof value.then === 'function';
};

export const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: 'ASYNC_START', subtype: action.type });
    action.payload
      .then(response => {
        action.payload = response;
        store.dispatch(action);
      })
      .catch(error => {
        action.error = true;
        action.payload = error.response.body;
        store.dispatch(action);
      });

    return;
  }

  next(action);
};

// eslint-disable-next-line no-unused-vars
export const localStorageMiddleware = store => next => action => {
  if (action.type === 'LOGIN' && !action.error) {
    window.localStorage.setItem('jwt', action.payload.user.token);
    setToken(action.payload.user.token);
  }

  next(action);
};
