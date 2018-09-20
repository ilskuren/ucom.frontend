import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../components/Avatar';
import Avatars from '../components/Avatars';
import Status from '../components/Status';
import HordeIco from '../static/img/horde_ico.png';

const ProfileHeader = ({
  name, nickname, status, userRatePosition, userRate, setUser, squareAvatar, users, poweredBy, isEditableStatus, isBoldTextInStatus,
}) => (
  <div className="profile-header">
    <div className="profile-header__user">
      <div className="profile-header__avatar">
        <Avatar src={HordeIco} alt={name} size="medium" square={squareAvatar} />
      </div>
      <div className="profile-header__user-info">
        <div>
          <h2 className="profile-header__name" title={name}>{name}</h2>
          <div className="edit" />
        </div>
        <div className="profile-header__nickname">@{nickname}</div>
        {poweredBy && (
          <div className="profile-header__powered-by">
            <div className="profile-header__powered-by-image">
              <Avatar src={poweredBy.avatar_filename} size="xxsmall" />
            </div>
           Powered by {poweredBy.name}
          </div>)}
        {users && <Avatars
          list={users}
          orderStacking="fifo"
          distance="far"
          size="msmall"
          maxAvatarsAmount={8}
        />}
        {users && <div className="profile-header__board">board</div>}
        <Status text={status} isEditable={isEditableStatus} setUser={setUser} isBoldText={isBoldTextInStatus} />
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
  name: PropTypes.string,
  nickname: PropTypes.string,
  status: PropTypes.string,
  userRatePosition: PropTypes.number,
  userRate: PropTypes.string,
  squareAvatar: PropTypes.bool,
  users: PropTypes.arrayOf(PropTypes.object),
  isEditableStatus: PropTypes.bool,
  isBoldTextInStatus: PropTypes.bool,
  poweredBy: PropTypes.string,
};

ProfileHeader.defaultProps = {
  status: '',
};

export default ProfileHeader;
