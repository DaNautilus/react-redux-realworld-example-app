import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
            {this.props.appName.toLowerCase()}
          </Link>

          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  appName: PropTypes.string
};

export default Header;
