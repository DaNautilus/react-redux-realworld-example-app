import { applyMiddleware, createStore } from 'redux';
import { promiseMiddleware } from './middleware';
import createHistory from 'history/createBrowserHistory';

const defaultState = {
  appName: 'conduit',
  articles: undefined
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'HOME_PAGE_LOADED':
      return { ...state, articles: action.payload.articles };
    default:
      break;
  }

  return state;
};

export const store = createStore(reducer, applyMiddleware(promiseMiddleware));

export const history = createHistory();
