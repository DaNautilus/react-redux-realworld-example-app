import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Banner from './banner';
import MainView from './main-view';
import { Articles } from '../../agent';

const mapStateToProps = state => ({
  appName: state.common.appName
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: 'HOME_PAGE_LOADED', payload })
});

class Home extends Component {
  componentWillMount() {
    this.props.onLoad(Articles.all());
  }

  render() {
    return (
      <div className="home-page">
        <Banner appName={this.props.appName} />

        <div className="container page">
          <div className="row">
            <MainView />
            <div className="col-xs-12 col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  appName: PropTypes.string,
  onLoad: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
