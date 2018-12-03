import React from 'react';
import PropTypes from 'prop-types';
import UserCard from './UserCard';
import Rate from './Rate';
import FollowButton from './FollowButton';

// TODO: Replace with UserListPopup
const ProfilesList = props => (
  <div className="entry-list">
    <div className="entry-list__title">{props.title}</div>

    <div className="entry-list__list">
      {props.users.map(item => (
        <div className="entry-list__item" key={item.id}>
          <div className="entry-list__card">
            <UserCard
              userName={item.userName}
              accountName={item.accountName}
              avatarUrl={item.avatarUrl}
              profileLink={item.profileLink}
              className="user-card_text_left"
              sign={props.noSign ? '' : '@'}
            />
          </div>

          <div className="entry-list__rate">
            <Rate value={item.rate} className="rate_small" />
          </div>

          {item.id &&
            <div className="entry-list__follow">
              <FollowButton
                follow={item.follow}
                userId={item.id}
                userAccountName={item.accountName}
                isStretched
              />
            </div>
          }
        </div>
      ))}
    </div>
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
