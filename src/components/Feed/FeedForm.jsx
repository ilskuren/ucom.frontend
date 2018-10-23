import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import Avatar from '../Avatar';
import Button from '../Button';
import { selectUser } from '../../store/selectors/user';
import { getUserById } from '../../store/users';
import { getFileUrl } from '../../utils/upload';
import { escapeQuotes } from '../../utils/text';

class FeedForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      message: this.props.message || '',
    };
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

          if (typeof this.props.onSubmit === 'function') {
            this.props.onSubmit(this.state.message);
          }
        }}
      >
        <div className="feed-form__field">
          <div className="feed-form__avatar">
            <Avatar src={getFileUrl(user.avatarFilename)} />
          </div>

          <div className="feed-form__message">
            <textarea
              autoFocus
              rows="4"
              className="feed-form__textarea"
              placeholder="Leave a comment"
              value={escapeQuotes(this.state.message)}
              onChange={e => this.setState({ message: e.target.value })}
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
                isDisabled={this.state.message.length === 0}
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

export default connect(state => ({
  users: state.users,
  posts: state.posts,
  user: selectUser(state),
}))(FeedForm);
