import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Banner from './banner';
import MainView from './main-view';
import Tags from './tags';
import { Articles, Tags as TagsAgent } from '../../agent';

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onLoad: (tab, payload) => dispatch({ type: 'HOME_PAGE_LOADED', tab, payload }),
  onUnload: () => dispatch({ type: 'HOME_PAGE_UNLOADED' }),
  onClickTag: (tag, pager, payload) => dispatch({ type: 'APPLY_TAG_FILTER', tag, pager, payload }),
});

class Home extends Component {
  componentWillMount() {
    const tab = this.props.token ? 'feed' : 'all';
    const articlesPromise = this.props.token
      ? Articles.feed()
      : Articles.all();

    this.props.onLoad(tab, Promise.all([TagsAgent.getAll(), articlesPromise]));
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
                <Tags tags={this.props.tags} onClickTag={this.props.onClickTag} />
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
  onLoad: PropTypes.func,
  token: PropTypes.string,
  tags: PropTypes.array,
  onClickTag: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
