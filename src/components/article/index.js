import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import marked from 'marked';
import { Articles as ArticlesAgent, Comments } from '../../agent';
import ArticleMeta from './article-meta';
import CommentContainer from './comment-container';

const mapStateToProps = state => ({
  ...state.article,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: 'ARTICLE_PAGE_LOADED', payload }),
  onUnload: () => dispatch({ type: 'ARTICLE_PAGE_UNLOADED' })
});

class Article extends Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      ArticlesAgent.get(this.props.match.params.id),
      Comments.forArticle(this.props.match.params.id)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.article) {
      return null;
    }

    const markup = { __html: marked(this.props.article.body, { sanitize: true }) };
    const canModify = this.props.currentUser && this.props.currentUser.username === this.props.article.author.username;

    return (
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{this.props.article.title}</h1>
            <ArticleMeta article={this.props.article} canModify={canModify} />
          </div>
        </div>
        <div className="container page">
          <div className="row article-content">
            <div className="col-xs-12">
              <div dangerouslySetInnerHTML={markup}></div>

              <ul className="tag-list">
                {
                  this.props.article.tagList.map(tag => {
                    return (
                      <li className="tag-default tag-pill tag-outline" key={tag}>{tag}</li>
                    );
                  })
                }
              </ul>
            </div>
          </div>

          <div className="article-actions"></div>

          <hr />

          <div className="row">
            <CommentContainer
              comments={this.props.comments || []}
              errors={this.props.commentErrors}
              slug={this.props.match.params.id}
              currentUser={this.props.currentUser} />
          </div>
        </div>

      </div >
    );
  }
}

Article.propTypes = {
  onLoad: PropTypes.func,
  onUnload: PropTypes.func,
  match: PropTypes.object,
  article: PropTypes.object,
  currentUser: PropTypes.object,
  comments: PropTypes.array,
  commentErrors: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
