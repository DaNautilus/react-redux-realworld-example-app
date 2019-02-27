import ListErrors from '../list-errors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Auth } from '../../agent';
import SettingsForm from './settings-form';

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: 'LOGOUT' }),
  onSubmitForm: user =>
    dispatch({ type: 'SETTINGS_SAVED', payload: Auth.save(user) }),
  onUnload: () => dispatch({ type: 'SETTINGS_PAGE_UNLOADED' })
});

class Settings extends Component {
  render() {
    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">

              <h1 className="text-xs-center">Your Settings</h1>

              <ListErrors errors={this.props.errors}></ListErrors>

              <SettingsForm
                currentUser={this.props.currentUser}
                onSubmitForm={this.props.onSubmitForm} />

              <hr />

              <button
                className="btn btn-outline-danger"
                onClick={this.props.onClickLogout}>
                Or click here to logout.
              </button>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  currentUser: PropTypes.object,
  onSubmitForm: PropTypes.func,
  onClickLogout: PropTypes.func,
  errors: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
