import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoggedOut from './logged-out';
import LoggedIn from './logged-in';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <LoggedOut currentUser={this.props.currentUser} />
          <LoggedIn currentUser={this.props.currentUser} />
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  appName: PropTypes.string,
  currentUser: PropTypes.string
};

export default Header;
