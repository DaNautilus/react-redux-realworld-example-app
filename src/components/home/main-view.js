import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ArticleList from '../article-list';

const mapStateToProps = state => ({
  articles: state.articles
});

const MainView = props => {
  return (
    <div className="col-xs-12 col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <li className="nav-item">
            <a href="/#" className="nav-link active">
              Global Feed
            </a>
          </li>
        </ul>
      </div>
      <ArticleList articles={props.articles} />
    </div>
  );
};

MainView.propTypes = {
  articles: PropTypes.array
};

export default connect(mapStateToProps, () => ({}))(MainView);
