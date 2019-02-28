import React from 'react';
import PropTypes from 'prop-types';
import { Articles } from '../../agent';

const YourFeedTab = props => {
  if (props.token) {
    const clickHandler = ev => {
      ev.preventDefault();
      props.onTabClick('feed', Articles.feed, Articles.feed());
    };

    return (
      <li className="nav-item">
        <a href="/#"
          className={props.tab === 'feed' ? 'nav-link active' : 'nav-link'}
          onClick={clickHandler}>
          Your Feed
        </a>
      </li>
    );
  }
  return null;
};

YourFeedTab.propTypes = {
  token: PropTypes.string,
  onTabClick: PropTypes.func,
  tab: PropTypes.string
};

export default YourFeedTab;
