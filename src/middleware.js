const isPromise = value => {
  return value && typeof value.then === 'function';
};

export const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    action.payload
      .then(response => {
        action.payload = response;
        store.dispatch(action);
      })
      .catch(error => {
        action.error = true;
        action.payload = error;
        store.dispatch(action);
      });

    return;
  }

  next(action);
};
