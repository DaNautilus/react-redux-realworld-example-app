import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ArticleList from '../article-list';
import YourFeedTab from './your-feed-tab';
import GlobalFeedTab from './global-feed-tab';
import TagFilterTab from './tag-filter-tab';
import { Articles } from '../../agent';

const mapStateToProps = state => ({
  ...state.articleList,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) => dispatch({ type: 'CHANGE_TAB', tab, pager, payload }),
  onSetPage: (tab, page) => dispatch({
    type: 'SET_PAGE',
    page,
    payload: tab === 'feed' ? Articles.feed(page) : Articles.all(page)
  }),
});

const MainView = props => {
  const onSetPage = page => props.onSetPage(props.tab, page);

  return (
    <div className="col-xs-12 col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <YourFeedTab token={props.token} tab={props.tab} onTabClick={props.onTabClick} />
          <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />
          <TagFilterTab tag={props.tag} />
        </ul>
      </div>
      <ArticleList
        articles={props.articles}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage}
        onSetPage={onSetPage}
      />
    </div>
  );
};

MainView.propTypes = {
  articles: PropTypes.array,
  token: PropTypes.string,
  tab: PropTypes.string,
  tag: PropTypes.string,
  onTabClick: PropTypes.func,
  articlesCount: PropTypes.number,
  currentPage: PropTypes.bool,
  onSetPage: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
