import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import { selectUser } from '../../../store/selectors/user';
import { getUserById } from '../../../store/users';
import { updateUser } from '../../../actions/users';
import IconEdit from '../../Icons/Edit';
import UserStatusForm from './UserStatusForm';

export const PLACEHOLDER = 'What’s Ur Passion…';
export const STATUS_MAX_LENGTH = 130;

const UserStatus = (props) => {
  const [formVisibility, setFormVisibility] = useState(false);

  const showForm = () => {
    setFormVisibility(true);
  };

  const hideForm = () => {
    setFormVisibility(false);
  };

  const user = getUserById(props.users, props.userId);

  if (!user) {
    return null;
  }

  if (!user.moodMessage && +props.user.id !== +user.id) {
    return null;
  }

  return (
    <div className="status">
      {props.user.id !== +user.id ? (
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
            onClick={() => showForm()}
          >
            {user.moodMessage || PLACEHOLDER}

            <span className="status__message-edit-icon">
              <IconEdit />
            </span>
          </div>
        )}

      {formVisibility && <UserStatusForm
        moodMessage={user.moodMessage}
        onClickHide={() => hideForm()}
        onClickSave={moodMessage => props.updateUser({ moodMessage })}
      />
      }
    </div>
  );
};


export default connect(
  state => ({
    users: state.users,
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    updateUser,
  }, dispatch),
)(UserStatus);
