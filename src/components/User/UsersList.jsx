import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import UserCard from '../UserCard';
import Rate from '../Rate';
import UserFollowButton from './UserFollowButton';
import { selectUser } from '../../store/selectors/user';
import { getUserById } from '../../store/users';
import { getUserName, getUserUrl } from '../../utils/user';
import { getFileUrl } from '../../utils/upload';

const UsersList = (props) => {
  if (!props.usersIds) {
    return null;
  }

  const users = props.usersIds.map(userId => getUserById(props.users, userId));

  return (
    <div className="profiles-list">
      <div className="profiles-list__header">
        <h3>{props.title}</h3>
      </div>

      <TransitionGroup className="profiles-list__content">
        {users.map(item => (
          <CSSTransition
            key={item.id}
            timeout={500}
            classNames="fade"
          >
            <div className="profiles-list__row" key={item.id}>
              <div className="profiles-list__user">
                <UserCard
                  className="user-card_text_left"
                  userName={getUserName(item)}
                  accountName={item.accountName}
                  avatarUrl={getFileUrl(item.avatarFilename)}
                  profileLink={getUserUrl(item.id)}
                  sign={props.noSign ? '' : '@'}
                />
              </div>
              <div className="profiles-list__info">
                <Rate value={item.currentRate} className="rate_profile rate_right rate_color_black" />

                <div className="profiles-list__button">
                  <UserFollowButton userId={item.id} />
                </div>
              </div>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

UsersList.propTypes = {
  title: PropTypes.string,
  noSign: PropTypes.bool,
  usersIds: PropTypes.arrayOf(PropTypes.number),
};

UsersList.defaultTypes = {
  title: 'Followers',
};

export default connect(state => ({
  users: state.users,
  user: selectUser(state),
}))(UsersList);
