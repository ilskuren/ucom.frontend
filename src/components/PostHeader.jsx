import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../components/Avatar';
import FollowButton from '../components/FollowButton';

const PostHeader = ({
  avatar, name, rating, userId, userUrl, user, follow, userAccountName,
}) => {
  const UserLinkTag = userUrl ? Link : 'span';

  return (
    <div className="post-header">
      <div className="toolbar">
        <div className="toolbar__main">
          <div className="inline">
            <div className="inline__item">
              <UserLinkTag to={userUrl}>
                <Avatar src={avatar} alt={name} />
              </UserLinkTag>
            </div>
            <div className="inline__item">
              <div className="post-header__user-name">
                <UserLinkTag to={userUrl}>
                  {name || <span className="blank">Lorem, ipsum.</span>}
                </UserLinkTag>
              </div>
              <div className="post-header__user-rate">{rating}°</div>
            </div>
          </div>
        </div>
        {!user.id || (user.id !== userId) ? (
          <div className="toolbar__side">
            <div className="post-header__follow-button">
              <FollowButton
                follow={follow}
                userId={userId}
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
  follow: PropTypes.bool,
  userAccountName: PropTypes.string,
};

export default connect(state => ({
  user: state.user,
}), null)(PostHeader);
