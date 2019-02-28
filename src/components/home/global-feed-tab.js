import React from 'react';
import PropTypes from 'prop-types';
import { Articles } from '../../agent';

const GlobalFeedTab = props => {
  const clickHandler = ev => {
    ev.preventDefault();
    props.onTabClick('all', Articles.all, Articles.all());
  };
  return (
    <li className="nav-item">
      <a
        href="/#"
        className={props.tab === 'all' ? 'nav-link active' : 'nav-link'}
        onClick={clickHandler}>
        Global Feed
      </a>
    </li>
  );
};

GlobalFeedTab.propTypes = {
  tab: PropTypes.string,
  onTabClick: PropTypes.func
};

export default GlobalFeedTab;
