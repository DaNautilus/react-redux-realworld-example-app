import React from 'react';
import { Link } from 'react-router-dom';
import { Articles, Profile as ProfileAgent } from '../agent';
import { connect } from 'react-redux';
import { Profile, mapStateToProps } from './index';

const mapDispatchToProps = dispatch => ({
  onLoad: (pager, payload) => dispatch({ type: 'PROFILE_PAGE_LOADED', pager, payload }),
  onUnload: () => dispatch({ type: 'PROFILE_PAGE_UNLOADED' })
});

class ProfileFavorites extends Profile {
  componentWillMount() {
    this.props.onLoad(page => Articles.favoritedBy(this.props.match.params.username, page), Promise.all([
      ProfileAgent.get(this.props.match.params.username),
      Articles.favoritedBy(this.props.match.params.username)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  renderTabs() {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link"
            to={`/@${this.props.profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link active"
            to={`/@${this.props.profile.username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFavorites);
