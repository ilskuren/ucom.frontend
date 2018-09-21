import React from 'react';
import PropTypes from 'prop-types';
import UserCard from './UserCard';
import Rate from './Rate';
import FollowButton from './FollowButton';

const ProfilesList = props => (
  <div className="profiles-list">
    <div className="profiles-list__header">
      <h3>{props.title}</h3>
    </div>
    {props.users.map((user) => {
      const {
      userName,
      accountName,
      avatarUrl,
      profileLink,
      rate,
      follow,
      id,
      } = user;
      return (
        <div className="profiles-list__row" key={id}>
          <div className="profiles-list__user">
            <UserCard
              userName={userName}
              accountName={accountName}
              avatarUrl={avatarUrl}
              profileLink={profileLink}
              className="user-card_text_left"
              sign={props.noSign ? '' : '@'}
            />
          </div>
          <div className="profiles-list__info">
            {rate && <Rate value={rate} className="rate_profile rate_right rate_color_black" />}

            {id && (
              <div className="profiles-list__button">
                <FollowButton
                  follow={follow}
                  userId={id}
                  userAccountName={accountName}
                  isStretched
                />
              </div>)
            }
          </div>
        </div>
    );
    })}
  </div>
);

ProfilesList.propTypes = {
  title: PropTypes.string,
  noSign: PropTypes.bool,
  users: PropTypes.arrayOf(PropTypes.object),
};

ProfilesList.defaultTypes = {
  title: 'Followers',
};

export default ProfilesList;
