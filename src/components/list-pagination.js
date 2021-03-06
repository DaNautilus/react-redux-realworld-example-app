import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Articles } from '../agent';

const mapDispatchToProps = dispatch => ({
  onSetPage: (page, payload) => dispatch({ type: 'SET_PAGE', page, payload })
});

const ListPagination = props => {
  if (props.articlesCount <= 10) {
    return null;
  }

  const range = [];
  for (let i = 0; i < Math.ceil(props.articlesCount / 10); ++i) {
    range.push(i);
  }

  const setPage = page => {
    if (props.pager) {
      props.onSetPage(page, props.pager(page));
    } else {
      props.onSetPage(page, Articles.all(page));
    }
  };

  return (
    <nav>
      <ul className="pagination">

        {
          range.map(v => {
            const isCurrent = v === props.currentPage;
            const onClick = ev => {
              ev.preventDefault();
              setPage(v);
            };
            return (
              <li
                className={isCurrent ? 'page-item active' : 'page-item'}
                onClick={onClick}
                key={v.toString()}>

                <a className="page-link" href="/#">{v + 1}</a>

              </li>
            );
          })
        }

      </ul>
    </nav>
  );
};

ListPagination.propTypes = {
  articlesCount: PropTypes.number,
  onSetPage: PropTypes.func,
  pager: PropTypes.func,
  currentPage: PropTypes.bool,
};

export default connect(() => ({}), mapDispatchToProps)(ListPagination);
