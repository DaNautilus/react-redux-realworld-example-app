import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Header from './header';
import PropTypes from 'prop-types';
import Home from './home';
import Login from './login';
import Register from './register';
import { setToken, Auth } from '../agent';

const mapStateToProps = state => ({
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({
  onRedirect: () => dispatch({ type: 'REDIRECT' }),
  onLoad: (payload, token) => dispatch({ type: 'APP_LOAD', payload, token })
});

class App extends Component {
  componentWillMount() {
    const token = window.localStorage.getItem('jwt');

    if (token) {
      setToken(token);
    }

    this.props.onLoad(token ? Auth.current() : null, token);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.props.history.push(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  render() {
    return (
      <div>
        <Header appName={this.props.appName} currentUser={this.props.currentUser} />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    );
  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired,
};

App.propTypes = {
  appName: PropTypes.string,
  currentUser: PropTypes.string,
  children: PropTypes.array,
  match: PropTypes.object,
  redirectTo: PropTypes.string,
  onRedirect: PropTypes.func,
  onLoad: PropTypes.func,
  history: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
