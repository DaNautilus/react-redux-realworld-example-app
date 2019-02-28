import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ArticleActions from './article-actions';

const ArticleMeta = props => {
  const article = props.article;

  return (
    <div className="article-meta">
      <Link to={`/@${article.author.username}`}>
        <img src={article.author.image} alt={article.author.username} />
      </Link>

      <div className="info">
        <Link to={`/@${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span className="date">
          {new Date(article.createdAt).toDateString()}
        </span>
      </div>

      <ArticleActions canModify={props.canModify} article={article} />
    </div>
  );
};

ArticleMeta.propTypes = {
  article: PropTypes.object,
  canModify: PropTypes.bool
};

export default ArticleMeta;
