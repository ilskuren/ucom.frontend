import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../components/Avatar';
import FollowButton from '../components/FollowButton';
import { selectUser } from '../store/selectors';

const PostHeader = ({
  avatar, name, rating, userId, userUrl, user, follow, userAccountName, theme,
}) => {
  const UserLinkTag = userUrl ? Link : 'span';
  return (
    <div className={cn('post-header', { [`post-header_theme_${theme}`]: Boolean(theme) })}>
      <div className="toolbar">
        <div className="toolbar__main">
          <div className="inline">
            <div className="inline__item">
              <UserLinkTag to={userUrl}>
                <Avatar src={avatar} alt={name} />
              </UserLinkTag>
            </div>
            <div className="inline__item">
              <div className={cn('post-header__user-name', { [`post-header__user-name_theme_${theme}`]: Boolean(theme) })} >
                <UserLinkTag to={userUrl}>
                  {name || <span className="blank">Lorem, ipsum.</span>}
                </UserLinkTag>
              </div>
              <div className={cn('post-header__user-rate', { [`post-header__user-rate_theme_${theme}`]: Boolean(theme) })} >{rating}°</div>
            </div>
          </div>
        </div>
        {!user.id || (user.id !== userId) ? (
          <div className="toolbar__side">
            <div className="post-header__follow-button">
              <FollowButton
                follow={follow}
                userId={userId}
                isStretched
                userAccountName={userAccountName}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

PostHeader.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.number,
  userId: PropTypes.number,
  userUrl: PropTypes.string,
  theme: PropTypes.string,
  follow: PropTypes.bool,
  userAccountName: PropTypes.string,
};

export default connect(state => ({
  user: selectUser(state),
}), null)(PostHeader);
