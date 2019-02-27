import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Header from './header';
import PropTypes from 'prop-types';
import Home from './home';
import Login from './login';

const mapStateToProps = state => ({
  appName: state.common.appName
});

class App extends Component {
  render() {
    return (
      <div>
        <Header appName={this.props.appName} />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
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
  children: PropTypes.array,
  match: PropTypes.object
};

export default connect(mapStateToProps, () => ({}))(App);
