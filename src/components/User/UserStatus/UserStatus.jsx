import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { selectUser } from '../../../store/selectors/user';
import { getUserById } from '../../../store/users';
import { updateUser } from '../../../actions/users';
import IconEdit from '../../Icons/Edit';
import UserStatusForm from './UserStatusForm';

export const PLACEHOLDER = 'What’s Ur Passion…';
export const STATUS_MAX_LENGTH = 130;

class UserStatus extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formVisibility: false,
    };
  }

  showForm() {
    this.setState({ formVisibility: true });
  }

  hideForm() {
    this.setState({ formVisibility: false });
  }

  render() {
    const user = getUserById(this.props.users, this.props.userId);

    if (!user) {
      return null;
    }

    if (!user.moodMessage && +this.props.user.id !== +user.id) {
      return null;
    }

    return (
      <div className="status" ref={(el) => { this.el = el; }}>
        {this.props.user.id !== +user.id ? (
          <div className="status__message">
            {user.moodMessage || 'What’s Ur @Passion…'}
          </div>
        ) : (
          <div
            role="presentation"
            className={classNames(
              'status__message',
              'status__message_editable',
              { 'status__message_empty': !user.moodMessage },
            )}
            onClick={() => this.showForm()}
          >
            {user.moodMessage || PLACEHOLDER}

            <span className="status__message-edit-icon">
              <IconEdit />
            </span>
          </div>
        )}

        {this.state.formVisibility &&
          <UserStatusForm
            moodMessage={user.moodMessage}
            onClickHide={() => this.hideForm()}
            onClickSave={moodMessage => this.props.updateUser({ moodMessage })}
          />
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    users: state.users,
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    updateUser,
  }, dispatch),
)(UserStatus);
