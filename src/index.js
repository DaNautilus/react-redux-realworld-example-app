import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch, HashRouter } from 'react-router-dom';
import App from './components/app';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
