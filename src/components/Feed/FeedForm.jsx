import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import Avatar from '../Avatar';
import Button from '../Button';
import { selectUser } from '../../store/selectors/user';
import { getUserById } from '../../store/users';
import { getFileUrl, getBase64FromFile } from '../../utils/upload';
import { setPostData, validatePostField } from '../../actions';
import { escapeQuotes } from '../../utils/text';
import IconClip from '../Icons/Clip';
import IconClose from '../Icons/Close';
import DropZone from '../DropZone';

class FeedForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      message: escapeQuotes(this.props.message) || '',
      base64Cover: null,
      fileImg: null,
    };
  }

  sumbitForm = (message, fileImg) => {
    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit(message, fileImg);
    }
  }

  render() {
    const user = getUserById(this.props.users, this.props.user.id);

    if (!user) {
      return null;
    }

    return (
      <form
        className="feed-form"
        onSubmit={(e) => {
          e.preventDefault();
          this.sumbitForm(this.state.message.trim(), this.state.fileImg);
        }}
      >
        <div className="feed-form__field">
          <div className="feed-form__avatar">
            <Avatar src={getFileUrl(user.avatarFilename)} />
          </div>

          <label name="img" className="feed-form__clip">
            <IconClip />
          </label>

          {(this.state.base64Cover || this.props.mainImageFilename) ? (
            <div className="cover cover_small">
              <div className="cover__inner">
                <div className="cover__remove">
                  <div
                    // type="button"
                    role="button"
                    className="button-clean button-clean_close"
                    onClick={() => {
                      console.log('lol');
                      this.setState({ base64Cover: '' });
                      this.props.setPostData({ mainImageFilename: '' });
                      this.props.validatePostField('mainImageFilename');
                    }}
                  >
                    <IconClose />
                  </div>
                </div>

                <img className="cover__img" src={this.state.base64Cover || getFileUrl(this.props.mainImageFilename)} alt="" />
              </div>
            </div>
          ) : (
            <DropZone
              className="drop-zone_clip"
              accept="image/jpeg, image/png"
              maxSize={1000000}
              onDrop={(files) => {
                getBase64FromFile(files[0]).then((base64Cover) => {
                  this.setState({
                    base64Cover,
                    fileImg: files[0],
                  });
                });
              }}
            />
          )}

          <div className="feed-form__message">
            <textarea
              autoFocus
              rows="4"
              className="feed-form__textarea"
              placeholder="Leave a comment"
              value={this.state.message}
              onChange={e => this.setState({ message: e.target.value })}
              onKeyDown={(e) => {
                if ((e.ctrlKey && e.keyCode === 13) || (e.keyCode <= 90 && e.keyCode === 13)) {
                  e.preventDefault();
                  this.sumbitForm(this.state.message, this.state.fileImg);
                }
              }}
            />
          </div>
        </div>

        <div className="feed-form__actions">
          <div className="inline">
            <div className="inline__item">
              <Button
                text="Cancel"
                size="small"
                theme="light"
                onClick={() => {
                  if (typeof this.props.onCancel === 'function') {
                    this.props.onCancel();
                  }
                }}
              />
            </div>
            <div className="inline__item">
              <Button
                text={this.props.message ? 'Save' : 'Post'}
                type="submit"
                size="small"
                theme="red"
                isDisabled={this.state.message.trim().length === 0}
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}

FeedForm.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  users: PropTypes.objectOf(PropTypes.object),
  message: PropTypes.string,
};

export default connect(
  state => ({
    users: state.users,
    posts: state.posts,
    user: selectUser(state),
  }),
  dispatch => ({
    setPostData: data => dispatch(setPostData(data)),
    validatePostField: data => dispatch(validatePostField(data)),
  }),
)(FeedForm);
