import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CommentInput from './comment-input';
import CommentList from './comment-list';

const CommentContainer = props => {
  if (props.currentUser) {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <div>
          <list-errors errors={props.errors}></list-errors>
          <CommentInput slug={props.slug} currentUser={props.currentUser} />
        </div>

        <CommentList comments={props.comments} slug={props.slug} currentUser={props.currentUser} />
      </div>
    );
  } else {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <p>
          <Link to="/login">Sign in</Link>
          &nbsp;or&nbsp;
          <Link to="/register">sign up</Link>
          &nbsp;to add comments on this article.
        </p>

        <CommentList
          comments={props.comments}
          slug={props.slug}
          currentUser={props.currentUser} />
      </div>
    );
  }
};

CommentContainer.propTypes = {
  currentUser: PropTypes.object,
  errors: PropTypes.object,
  slug: PropTypes.slug,
  comments: PropTypes.array
};

export default CommentContainer;
