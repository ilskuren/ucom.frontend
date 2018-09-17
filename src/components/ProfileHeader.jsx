import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../components/Avatar';
import Status from '../components/Status';
import HordeIco from '../static/img/horde_ico.png';

const ProfileHeader = ({
  name, nickname, status, userRatePosition, userRate,
}) => (
  <div className="profile-header">
    <div className="profile-header__user">
      <div className="profile-header__avatar">
        <Avatar src={HordeIco} alt={name} size="medium" />
      </div>
      <div className="profile-header__user-info">
        <div>
          <h2 className="profile-header__name" title={name}>{name}</h2>
          <div className="profile-header__edit" />
        </div>
        <div className="profile-header__nickname">@{nickname}</div>
        <Status text={status} isEditable />
      </div>
    </div>
    <div className="profile-header__user-rating">
      <div className="profile-header__user-position">#{userRatePosition}</div>
      <div className="profile-header__user-rate">{userRate}</div>
      <div className="profile-header__user-rate-title">RATE</div>
    </div>
  </div>
);

ProfileHeader.propTypes = {
  name: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  status: PropTypes.string,
  userRatePosition: PropTypes.number.isRequired,
  userRate: PropTypes.string.isRequired,
};

ProfileHeader.defaultProps = {
  status: '',
};

export default ProfileHeader;
