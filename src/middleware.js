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
