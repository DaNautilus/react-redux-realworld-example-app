import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './components/header';
import Home from './components/home';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
  appName: state.appName
});

class App extends Component {
  render() {
    return (
      <div>
        <Header appName={this.props.appName} />
        <Home />
      </div>
    );
  }
}

App.propTypes = {
  appName: PropTypes.string
};

export default connect(mapStateToProps, () => ({}))(App);
