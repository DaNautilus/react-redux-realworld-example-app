import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-xs-12 col-md-6 offset-md-3">
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                <a href="#/">Need an account?</a>
              </p>

              <form>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg" type="email" placeholder="Email" />
                  <input className="form-control form-control-lg" type="password" placeholder="Password" />
                </fieldset>

                <button className="btn btn-lg btn-primary" type="submit">
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

export default Login;
