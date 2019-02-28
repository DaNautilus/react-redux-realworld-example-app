import React from 'react';
import { connect } from 'react-redux';
import { Comments } from '../../agent';
import PropTypes from 'prop-types';

const mapDispatchToProps = dispatch => ({
  onClick: (payload, commentId) => dispatch({ type: 'DELETE_COMMENT', payload, commentId })
});

const DeleteButton = props => {
  const del = () => {
    const payload = Comments.delete(props.slug, props.commentId);
    props.onClick(payload, props.commentId);
  };

  if (props.show) {
    return (
      <span className="mod-options">
        <i className="ion-trash-a" onClick={del}></i>
      </span>
    );
  }
  return null;
};

DeleteButton.propTypes = {
  commentId: PropTypes.string,
  slug: PropTypes.string,
  onClick: PropTypes.func,
  show: PropTypes.bool
};

export default connect(() => ({}), mapDispatchToProps)(DeleteButton);
