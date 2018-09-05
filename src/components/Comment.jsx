import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import CommentForm from './CommentForm';
import Avatar from './Avatar';

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
            <Avatar size="xsmall" src={this.props.avatar} />
          </div>
          <div className="toolbar__main">
            <div className="comment__username">{this.props.userName}</div>
            <div className="comment__account">@{this.props.accountName}</div>
            <div className="comment__text">{this.props.description}</div>
            <div className="comment__actions">
              <div className="inline">
                <div className="inline__item">
                  <button
                    className="button-clean button-clean_link"
                    onClick={() => this.showForm()}
                  >
                    <div className="comment__reply">Reply</div>
                  </button>
                </div>
                <div className="inline__item">
                  <span className="comment__time">{this.props.created}</span>
                </div>
              </div>
            </div>
            {this.state.active && (
              <div className="comment__form">
                <CommentForm
                  active
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
  userName: PropTypes.string,
  avatar: PropTypes.string,
  accountName: PropTypes.string,
  description: PropTypes.string,
  created: PropTypes.string,
  onSubmit: PropTypes.func,
  depth: PropTypes.string,
};

export default connect(state => ({
  user: state.user,
}))(Comments);
