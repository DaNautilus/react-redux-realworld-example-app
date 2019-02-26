import React from 'react';
import PropTypes from 'prop-types';
import ArticlePreview from './article-preview';

const ArticleList = props => {
  if (!props.articles) {
    return (
      <div className="article-preview">Loading...</div>
    );
  }

  if (props.articles.length === 0) {
    return (
      <div className="article-preview">No articles are here... yet.</div>
    );
  }

  return (
    <div>
      {
        props.articles.map((article, index) => (
          <ArticlePreview key={index} article={article} />
        ))
      }
    </div>
  );
};

ArticleList.propTypes = {
  articles: PropTypes.array
};

export default ArticleList;
