import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <a href="/#" className="navbar-brand">
            {this.props.appName.toLowerCase()}
          </a>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  appName: PropTypes.string
};

export default Header;
