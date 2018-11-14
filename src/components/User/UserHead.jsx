import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import Avatar from '../Avatar';
import IconEdit from '../Icons/Edit';
import Rate from '../Rate';
import UserStatus from './UserStatus';
import UserFollowButton from './UserFollowButton';
import Followers from '../Followers/Followers';
import { getUserById } from '../../store/users';
import { getFileUrl } from '../../utils/upload';
import { getUserName, getUserEditProfileUrl } from '../../utils/user';
import { selectUser } from '../../store/selectors/user';

const UserHead = (props) => {
  const user = getUserById(props.users, props.userId);

  if (!user) {
    return null;
  }

  return (
    <div className="user-header">
      <div className="user-header__main">
        <div className="user-header__avatar">
          <Avatar size="medium" src={getFileUrl(user.avatarFilename)} />
        </div>
        <div className="user-header__account">
          <div className="user-header__name">
            <h2 className="title title_light">{getUserName(user)}</h2>
          </div>
          <div className="user-header__account-name">@{user.nickname}</div>
          <div className="user-header__status">
            <UserStatus userId={user.id} />
          </div>
        </div>
        <div className="user-header__rate">
          <Rate className="rate_big" value={+user.currentRate} />
        </div>
      </div>
      <div className="user-header__side">
        {props.user.id && +props.user.id === +user.id ? (
          <div className="user-header__edit-button">
            <span className="inline">
              <span className="inline__item">
                <Link className="button-icon button-icon_edit button-icon_edit_bordered" to={getUserEditProfileUrl()}>
                  <IconEdit />
                </Link>
              </span>
              <span className="inline__item">
                <Link to={getUserEditProfileUrl()}>Edit</Link>
              </span>
            </span>
          </div>
        ) : (
          <div className="user-header__follow-button">
            <UserFollowButton userId={+user.id} />
          </div>
        )}

        <div className="inline inline_large">
          {user.followedBy && (
            <div className="inline__item">
              <Followers title="Followers" usersIds={user.followedBy.map(item => item.id)} />
            </div>
          )}
          {user.iFollow && (
            <div className="inline__item">
              <Followers title="Following" usersIds={user.iFollow.map(item => item.id)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

UserHead.propTypes = {
  users: PropTypes.objectOf(PropTypes.object),
  userId: PropTypes.number,
};

export default connect(state => ({
  users: state.users,
  user: selectUser(state),
}))(UserHead);
