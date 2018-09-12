import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import CommentForm from './CommentForm';
import Avatar from './Avatar';
import Rating from './Rating';

class Comments extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  showForm() {
    this.setState({ active: true });
  }

  hideForm() {
    this.setState({ active: false });
  }

  render() {
    return (
      <div className="comment" depth={this.props.depth}>
        <div className="toolbar toolbar_top">
          <div className="toolbar__side">
            <Link to={this.props.userUrl}>
              <Avatar size="xsmall" src={this.props.avatar} />
            </Link>
          </div>
          <div className="toolbar__main">
            <div className="comment__header">
              <div className="toolbar">
                <div className="toolbar__main">
                  <div className="comment__username">
                    <Link to={this.props.userUrl}>{this.props.userName}</Link>
                  </div>
                  <div className="comment__account">@{this.props.accountName}</div>
                </div>
                <div className="toolbar__side">
                  <Rating
                    postId={this.props.postId}
                    commentId={this.props.id}
                    rating={this.props.rating}
                    choice={this.props.choice}
                  />
                </div>
              </div>
            </div>
            <div className="comment__text">{this.props.description}</div>
            <div className="comment__actions">
              <div className="inline">
                {this.props.user.id && (
                  <div className="inline__item">
                    <button
                      className="button-clean button-clean_link"
                      onClick={() => this.showForm()}
                    >
                      <div className="comment__reply">Reply</div>
                    </button>
                  </div>
                )}
                <div className="inline__item">
                  <span className="comment__time">{this.props.created}</span>
                </div>
              </div>
            </div>
            {this.state.active && (
              <div className="comment__form">
                <CommentForm
                  active
                  autoFocus
                  onReset={() => this.hideForm()}
                  onSubmit={(description) => {
                    this.props.onSubmit(description);
                    this.hideForm();
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Comments.propTypes = {
  id: PropTypes.number,
  userName: PropTypes.string,
  userUrl: PropTypes.string,
  avatar: PropTypes.string,
  accountName: PropTypes.string,
  description: PropTypes.string,
  created: PropTypes.string,
  onSubmit: PropTypes.func,
  depth: PropTypes.number,
  postId: PropTypes.number,
  rating: PropTypes.number,
  choice: PropTypes.string,
};

export default connect(state => ({
  user: state.user,
}))(Comments);
