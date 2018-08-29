import { Link } from 'react-router-dom';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import Avatar from '../components/Avatar';

const PostHeader = ({
  avatar, name, rating, userId, userUrl, editUrl,
}) => {
  const UserLinkTag = userUrl ? Link : 'span';

  return (
    <div className="post-header">
      <div className="post-header__user-card">
        <div className="post-header__user-avatar">
          <UserLinkTag to={userUrl}>
            <Avatar src={avatar} alt={name} />
          </UserLinkTag>
        </div>

        <div className="post-header__user-info">
          <div className="post-header__user-name">
            <UserLinkTag to={userUrl}>
              {name || (
                <span className="blank">Lorem, ipsum.</span>
              )}
            </UserLinkTag>
          </div>

          <div className="post-header__user-rate">
            {rating ? (
              <Fragment>{rating}<span className="post-header__user-rate-degree">°</span></Fragment>
            ) : (
              <span className="blank">1 000</span>
            )}
          </div>
        </div>
      </div>

      <div className="post-header__follow-button">
        {userId ? (
          <Button
            isStretched
            text="Follow"
            size="medium"
            theme="transparent"
          />
        ) : (
          <Button
            isStretched
            text="Follow"
            size="medium"
            theme="blank"
          />
        )}
      </div>
    </div>
  );
};

PostHeader.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.string,
  userId: PropTypes.number,
  userUrl: PropTypes.string,
};

export default PostHeader;
