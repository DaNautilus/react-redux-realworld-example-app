import { applyMiddleware, createStore } from 'redux';
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import reducer from './reducer';

export const history = createHistory();

const getMiddleware = () => applyMiddleware(promiseMiddleware, localStorageMiddleware, createLogger());

export const store = createStore(reducer, getMiddleware());
