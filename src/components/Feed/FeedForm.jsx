import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import Avatar from '../Avatar';
import Button from '../Button';
import { selectUser } from '../../store/selectors/user';
import { getUserById } from '../../store/users';
import { getFileUrl } from '../../utils/upload';
import { createCommentPost } from '../../actions/posts';

class FeedForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      message: '',
    };
  }

  showForm() {
    this.setState({
      active: true,
      message: '',
    });
  }

  hideForm() {
    this.setState({ active: false });
  }

  createPost(e) {
    e.preventDefault();
    this.props.createCommentPost({ message: this.state.message });
    this.hideForm();
  }

  render() {
    const user = getUserById(this.props.users, this.props.user.id);

    if (!user) {
      return null;
    }

    return (
      <div className="feed-form">
        <div className="feed-form__invite" role="presentation" onClick={() => this.showForm()}>
          <span className="inline">
            <span className="inline__item">Hey</span>
            <span className="inline__item">
              <Avatar src={getFileUrl(user.avatarFilename)} />
            </span>
            <span className="inline__item">what’s new?</span>
          </span>
        </div>

        {this.state.active && (
          <form className="feed-form__container" onSubmit={e => this.createPost(e)}>
            <div className="feed-form__overlay" />
            <div className="feed-form__inner">
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
                    value={this.state.message}
                    onChange={e => this.setState({ message: e.target.value })}
                  />
                </div>
              </div>
              <div className="feed-form__actions">
                <div className="inline">
                  <div className="inline__item">
                    <Button text="Cancel" size="small" theme="light" onClick={() => this.hideForm()} />
                  </div>
                  <div className="inline__item">
                    <Button text="Post" type="submit" size="small" theme="red" isDisabled={this.state.message.length === 0} />
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    users: state.users,
    posts: state.posts,
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    createCommentPost,
  }, dispatch),
)(FeedForm);
