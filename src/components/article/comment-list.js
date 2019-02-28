import React from 'react';
import Comment from './comment';
import PropTypes from 'prop-types';

const CommentList = props => {
  return (
    <div>
      {
        props.comments.map(comment => {
          return (
            <Comment
              comment={comment}
              currentUser={props.currentUser}
              slug={props.slug}
              key={comment.id} />
          );
        })
      }
    </div>
  );
};

CommentList.propTypes = {
  currentUser: PropTypes.object,
  slug: PropTypes.string,
  comments: PropTypes.array
};

export default CommentList;
