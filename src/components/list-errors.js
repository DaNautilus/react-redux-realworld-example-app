import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListErrors extends Component {
  render() {
    const errors = this.props.errors;

    if (errors) {
      return (
        <ul className="error-messages">
          {
            Object.keys(errors).map(key => (<li key={key}>{key} {errors[key]}</li>))
          }
        </ul>
      );
    }

    return null;
  }
}

ListErrors.propTypes = {
  errors: PropTypes.object
};

export default ListErrors;
