import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListErrors from './list-errors';
import { Auth } from '../agent';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value => dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'email', value }),
  onChangePassword: value => dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'password', value }),
  onChangeUsername: value => dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'username', value }),
  onSubmit: (username, email, password) => dispatch({ type: 'REGISTER', payload: Auth.register(username, email, password) })
});

class Register extends Component {
  constructor() {
    super();

    this.onChangeEmail = event => this.props.onChangeEmail(event.target.value);
    this.onChangePassword = event => this.props.onChangePassword(event.target.value);
    this.onChangeUsername = event => this.props.onChangeUsername(event.target.value);
    this.submitForm = (username, email, password) => event => {
      event.preventDefault();
      this.props.onSubmit(username, email, password);
    };
  }

  render() {
    const email = this.props.email || '';
    const password = this.props.password || '';
    const username = this.props.username || '';

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="/login">
                  Have an account?
                </Link>
              </p>

              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm(username, email, password)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Username"
                      value={this.props.username}
                      onChange={this.onChangeUsername} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={this.props.email}
                      onChange={this.onChangeEmail} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={this.props.password}
                      onChange={this.onChangePassword} />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}>
                    Sign up
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  username: PropTypes.string,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  onChangeUsername: PropTypes.func,
  onSubmit: PropTypes.func,
  inProgress: PropTypes.bool,
  errors: PropTypes.object
};


export default connect(mapStateToProps, mapDispatchToProps)(Register);
