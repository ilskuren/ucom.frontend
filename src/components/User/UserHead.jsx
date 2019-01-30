import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import Avatar from '../Avatar';
import Rate from '../Rate';
import UserStatus from './UserStatus/UserStatus';
import UserFollowButton from './UserFollowButton';
import Followers from '../Followers/Followers';
import { getUserById } from '../../store/users';
import { getFileUrl } from '../../utils/upload';
import { getUserName, getUserEditProfileUrl } from '../../utils/user';
import { selectUser } from '../../store/selectors/user';
import ButtonEdit from '../ButtonEdit';

const UserHead = (props) => {
  const user = getUserById(props.users, props.userId);

  if (!user) {
    return null;
  }

  return (
    <div className="user-header">
      <div className="user-header__content user-header__content_main">
        <div className="user-header__section user-header__section_avatar">
          <Avatar size="medium" src={getFileUrl(user.avatarFilename)} />
        </div>
        <div className="user-header__section user-header__section_account">
          <div className="user-header__name">
            <h2 className="title title_medium">{getUserName(user)}</h2>
          </div>
          <div className="user-header__account-name">@{user.nickname}</div>
          <div className="user-header__status">
            <UserStatus userId={user.id} />
          </div>
        </div>
        <div className="user-header__section user-header__section_rate">
          <Rate className="rate_big" value={+user.currentRate} />
        </div>
      </div>

      <div className="user-header__content">
        <div className="user-header__section">
          {props.user.id && +props.user.id === +user.id ? (
            <div className="user-header__edit-button">
              <span className="inline">
                <span className="inline__item">
                  <ButtonEdit url={getUserEditProfileUrl()} />
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
        </div>

        <div className="user-header__section">
          <div className="inline inline_large">
            {user.followedBy && (
              <div className="inline__item">
                <Followers title="Followers" usersIds={user.followedBy} />
              </div>
            )}
            {user.iFollow && (
              <div className="inline__item">
                <Followers title="Following" usersIds={user.iFollow} />
              </div>
            )}
          </div>
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
