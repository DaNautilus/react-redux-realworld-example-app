import { combineReducers } from 'redux';
import auth from './reducers/auth';
import common from './reducers/common';
import home from './reducers/home';
import settings from './reducers/settings';
import article from './reducers/article';
import articleList from './reducers/article-list';
import profile from './reducers/profile';

export default combineReducers({
  auth,
  common,
  home,
  settings,
  article,
  articleList,
  profile
});
