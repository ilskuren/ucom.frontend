import React from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import Avatar from '../components/Avatar';

const PostHeader = ({ avatar, name, rating }) => (
  <div className="post-header">
    <div className="post-header__user-card">
      <div className="post-header__user-avatar">
        <Avatar src={avatar} alt={name} />
      </div>
      <div className="post-header__user-info">
        <div className="post-header__user-name">{name}</div>
        <div className="post-header__user-rate">{rating}<span className="post-header__user-rate-degree">°</span></div>
      </div>
    </div>
    <div className="post-header__follow-button">
      <Button isStretched theme="transparent" size="medium" text="Follow" />
    </div>
  </div>
);

PostHeader.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
};

export default PostHeader;
