export function combineReducers(...func) {
  return func;
}

export function createStore(func) {
  let res = Array.isArray(func) ? {} : undefined;
  let callback = [];
  let reducer = func;

  const publishToAll = () => {
    callback.forEach((func) => func(res));
  };

  const getState = () => res;

  const dispatch = (action) => {
    if (Array.isArray(reducer)) {
      reducer.forEach((item) => {
        res = {
          ...res,
          [item.name]: item(res, action),
        };
      });
    } else {
      res = [...reducer(res, action)];
    }
    console.log(res, action);

    publishToAll();
  };

  const subscribe = (func) => callback.push(func);

  return {
    getState,
    dispatch,
    subscribe,
  };
}
