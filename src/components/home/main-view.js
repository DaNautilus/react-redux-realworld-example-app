import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ArticleList from '../article-list';
import YourFeedTab from './your-feed-tab';
import GlobalFeedTab from './global-feed-tab';
import TagFilterTab from './tag-filter-tab';

const mapStateToProps = state => ({
  ...state.articleList,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) => dispatch({ type: 'CHANGE_TAB', tab, pager, payload })
});

const MainView = props => {
  return (
    <div className="col-xs-12 col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <YourFeedTab token={props.token} tab={props.tab} onTabClick={props.onTabClick} />
          <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />
          <TagFilterTab tag={props.tag} />
        </ul>
      </div>
      <ArticleList articles={props.articles} />
    </div>
  );
};

MainView.propTypes = {
  articles: PropTypes.array,
  token: PropTypes.string,
  tab: PropTypes.string,
  tag: PropTypes.string,
  onTabClick: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
