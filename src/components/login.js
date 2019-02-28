import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Auth } from '../agent';
import ListErrors from './list-errors';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value => dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'email', value }),
  onChangePassword: value => dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'password', value }),
  onSubmit: (email, password) => dispatch({ type: 'LOGIN', payload: Auth.login(email, password) }),
  onUnload: () => dispatch({ type: 'LOGIN_PAGE_UNLOADED' })
});

class Login extends Component {
  constructor() {
    super();

    this.onChangeEmail = event => this.props.onChangeEmail(event.target.value);
    this.onChangePassword = event => this.props.onChangePassword(event.target.value);
    this.submitForm = (email, password) => event => {
      event.preventDefault();
      this.props.onSubmit(email, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email || '';
    const password = this.props.password || '';

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-xs-12 col-md-6 offset-md-3">
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                <a href="/#">Need an account?</a>
              </p>

              <ListErrors errors={this.props.errors}></ListErrors>

              <form onSubmit={this.submitForm(email, password)}>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg" type="email" placeholder="Email" value={email} onChange={this.onChangeEmail} />
                </fieldset>

                <fieldset className="form-group">
                  <input className="form-control form-control-lg" type="password" placeholder="Password" value={password} onChange={this.onChangePassword} />
                </fieldset>

                <button className="btn btn-lg btn-primary pull-xs-right" type="submit" disabled={this.props.inProgress}>
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  onSubmit: PropTypes.func,
  onUnload: PropTypes.func,
  inProgress: PropTypes.bool,
  errors: PropTypes.object
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
