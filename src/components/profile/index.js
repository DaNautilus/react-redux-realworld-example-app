import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Articles, Profile as ProfileAgent } from '../../agent';
import ArticleList from '../article-list';
import EditProfileSettings from './edit-profile-settings';
import FollowUserButton from './follow-user-button';

const mapStateToProps = state => ({
  ...state.articleList,
  currentUser: state.common.currentUser,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  onFollow: username => dispatch({
    type: 'FOLLOW_USER',
    payload: ProfileAgent.follow(username)
  }),
  onLoad: payload => dispatch({ type: 'PROFILE_PAGE_LOADED', payload }),
  onUnfollow: username => dispatch({
    type: 'UNFOLLOW_USER',
    payload: ProfileAgent.unfollow(username)
  }),
  onUnload: () => dispatch({ type: 'PROFILE_PAGE_UNLOADED' }),
  onSetPage: (page, payload) => dispatch({ type: 'SET_PAGE', page, payload }),
});

class Profile extends Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      ProfileAgent.get(this.props.match.params.username),
      Articles.byAuthor(this.props.match.params.username)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  onSetPage(page) {
    const promise = Articles.byAuthor(this.props.profile.username, page);
    this.props.onSetPage(page, promise);
  }

  renderTabs() {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link active"
            to={`/@${this.props.profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            to={`/@${this.props.profile.username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  }

  render() {
    const profile = this.props.profile;
    if (!profile) {
      return null;
    }

    const isUser = this.props.currentUser &&
      this.props.profile.username === this.props.currentUser.username;

    return (
      <div className="profile-page">

        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">

                <img src={profile.image} className="user-img" alt={profile.username} />
                <h4>{profile.username}</h4>
                <p>{profile.bio}</p>

                <EditProfileSettings isUser={isUser} />
                <FollowUserButton
                  isUser={isUser}
                  user={profile}
                  follow={this.props.onFollow}
                  unfollow={this.props.onUnfollow}
                />

              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">

            <div className="col-xs-12 col-md-10 offset-md-1">

              <div className="articles-toggle">
                {this.renderTabs()}
              </div>

              <ArticleList
                articles={this.props.articles}
                articlesCount={this.props.articlesCount}
                currentPage={this.props.currentPage}
                onSetPage={this.onSetPage} />
            </div>

          </div>
        </div>

      </div>
    );
  }
}

Profile.propTypes = {
  currentUser: PropTypes.object,
  currentPage: PropTypes.object,
  profile: PropTypes.object,
  articlesCount: PropTypes.number,
  articles: PropTypes.array,
  pager: PropTypes.object,
  onFollow: PropTypes.func,
  onUnfollow: PropTypes.func,
  onLoad: PropTypes.func,
  onUnload: PropTypes.func,
  match: PropTypes.object,
  onSetPage: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export { Profile, mapStateToProps };
