import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import Avatar from './Avatar';
import Button from './Button';
import { getFileUrl } from '../utils/upload';

class CommentForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: this.props.active,
      comment: '',
    };
  }

  show() {
    this.setState({ active: true });
  }

  hide() {
    if (!this.state.comment.length) {
      this.reset();
    }
  }

  submit() {
    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit(this.state.comment);
    }

    this.reset();
  }

  reset() {
    this.setState({
      comment: '',
      active: false,
    }, () => {
      if (typeof this.props.onReset === 'function') {
        this.props.onReset();
      }
    });
  }

  render() {
    return (
      <div className="comment-form">
        <div className="toolbar toolbar_top">
          <div className="toolbar__side">
            <Avatar size="xsmall" src={getFileUrl(this.props.user.avatar_filename)} />
          </div>

          <div className="toolbar__main">
            <textarea
              value={this.state.comment}
              rows={this.state.active ? 3 : 1}
              className="comment-form__input"
              placeholder="Leave a comment"
              onFocus={() => this.show()}
              onBlur={() => this.hide()}
              onChange={(e) => {
                this.setState({ comment: e.target.value });
              }}
            />

            {this.state.active && (
              <div className="comment-form__actions">
                <div className="toolbar">
                  <div className="toolbar__main" />
                  <div className="toolbar__side">
                    <div className="inline">
                      <div className="inline__item">
                        <Button
                          theme="gray"
                          size="small"
                          text="Cancel"
                          onClick={() => this.reset()}
                        />
                      </div>
                      <div className="inline__item">
                        <Button
                          theme="red"
                          size="small"
                          text="Post"
                          onClick={() => this.submit()}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  active: PropTypes.bool,
  onReset: PropTypes.func,
  onSubmit: PropTypes.bool,
};

export default connect(state => ({
  user: state.user,
}))(CommentForm);
