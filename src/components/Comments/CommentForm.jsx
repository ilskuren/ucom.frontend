import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Avatar from '../Avatar';
import Button from '../Button';
import { getFileUrl } from '../../utils/upload';
import { authShowPopup } from '../../actions/auth';
import { selectUser } from '../../store/selectors';
import { getTextContent } from '../../utils/text';
import TributeWrapper from '../TributeWrapper';

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
    if (!this.props.user.id) {
      this.props.authShowPopup();
      return;
    }

    if (typeof this.props.onSubmit === 'function') {
      const text = getTextContent(this.el.value);

      this.props.onSubmit(text.trim());
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
            <Avatar
              size="xsmall"
              src={getFileUrl(this.props.user.avatarFilename)}
              showBadge={this.props.showBadge}
              badgeTitle={this.props.badgeTitle}
              badgeUrl={this.props.badgeUrl}
              badgeLink={this.props.badgeLink}
            />
          </div>

          <div className="toolbar__main">
            <TributeWrapper>
              <textarea
                ref={(el) => { this.el = el; }}
                autoFocus={this.props.autoFocus} //eslint-disable-line
                value={this.state.comment}
                rows={this.state.active ? 3 : 1}
                className="comment-form__input"
                placeholder="Leave a comment"
                maxLength="2000"
                onFocus={() => this.show()}
                onBlur={() => this.hide()}
                onChange={(e) => {
                  this.setState({ comment: e.target.value });
                }}
                onKeyDown={(e) => {
                  if (this.state.comment.trim().length === 0) {
                    return;
                  }

                  if ((e.ctrlKey && e.keyCode === 13) || (e.metaKey && e.keyCode === 13)) {
                    e.target.blur();
                    e.preventDefault();
                    this.submit();
                  }
                }}
              />
            </TributeWrapper>

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
                          isDisabled={this.state.comment.trim().length === 0}
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
  onSubmit: PropTypes.func,
  authShowPopup: PropTypes.func,
  showBadge: PropTypes.bool,
  badgeTitle: PropTypes.string,
  badgeUrl: PropTypes.string,
  badgeLink: PropTypes.string,
};

export default connect(
  state => ({
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    authShowPopup,
  }, dispatch),
)(CommentForm);
