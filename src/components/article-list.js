import React from 'react';
import PropTypes from 'prop-types';
import ArticlePreview from './article-preview';
import ListPagination from './list-pagination';

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
        props.articles.map(article => (
          <ArticlePreview key={article.slug} article={article} />
        ))
      }

      <ListPagination
        pager={props.pager}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage}
        onSetPage={props.onSetPage} />
    </div>
  );
};

ArticleList.propTypes = {
  articles: PropTypes.array,
  pager: PropTypes.func,
  articlesCount: PropTypes.number,
  currentPage: PropTypes.bool,
  onSetPage: PropTypes.func
};

export default ArticleList;
