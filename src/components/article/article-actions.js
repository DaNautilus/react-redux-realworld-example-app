import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Articles } from '../../agent';

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload =>
    dispatch({ type: 'DELETE_ARTICLE', payload })
});

const ArticleActions = props => {
  const article = props.article;
  const del = () => {
    props.onClickDelete(Articles.del(article.slug));
  };

  if (props.canModify) {
    return (
      <span>

        <Link
          to={`/editor/${article.slug}`}
          className="btn btn-outline-secondary btn-sm">
          <i className="ion-edit"></i> Edit Article
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a"></i> Delete Article
        </button>

      </span>
    );
  }

  return (
    <span>
    </span>
  );
};

ArticleActions.propTypes = {
  article: PropTypes.object,
  onClickDelete: PropTypes.func,
  canModify: PropTypes.bool
};

export default connect(() => ({}), mapDispatchToProps)(ArticleActions);
