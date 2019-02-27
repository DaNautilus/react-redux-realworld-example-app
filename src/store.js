import { applyMiddleware, createStore, combineReducers } from 'redux';
import { promiseMiddleware } from './middleware';
import createHistory from 'history/createBrowserHistory';

import authReducer from './reducers/auth';
import commonReducer from './reducers/common';
import homeReducer from './reducers/home';

const reducer = combineReducers({
  auth: authReducer,
  common: commonReducer,
  home: homeReducer
});

export const store = createStore(reducer, applyMiddleware(promiseMiddleware));

export const history = createHistory();
