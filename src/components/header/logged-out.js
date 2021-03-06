import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LoggedOut = props => {
  if (!props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Sign in
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Sign up
          </Link>
        </li>
      </ul>
    );
  }

  return null;
};

LoggedOut.propTypes = {
  currentUser: PropTypes.object
};

export default LoggedOut;
