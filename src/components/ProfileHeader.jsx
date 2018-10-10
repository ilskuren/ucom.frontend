import React from 'react';
import PropTypes from 'prop-types';
// import cn from 'classnames';
import Avatar from '../components/Avatar';
import Avatars from '../components/Avatars';
// import Status from '../components/Status';

const ProfileHeader = ({
  name, nickname, userRate, squareAvatar, users, poweredBy, isEditableStatus,
}) => (
  <div className="profile-header">
    <div className="profile-header__user">
      <div className="profile-header__avatar">
        <Avatar alt={name} size="medium" square={squareAvatar} />
      </div>
      <div className="profile-header__user-info">
        <div>
          <h2 className="profile-header__name" title={name}>{name}</h2>
          {isEditableStatus && <div className="edit" />}
        </div>

        <div className="profile-header__nickname">@{nickname}</div>

        {poweredBy && (
          <div className="profile-header__powered-by">
            {/* <div className="profile-header__powered-by-image">
              <Avatar src={poweredBy.avatarFilename} size="xxsmall" />
            </div> */}
           Powered by {poweredBy.name}
          </div>)
        }

        {users && <Avatars
          list={users}
          orderStacking="fifo"
          distance="far"
          size="msmall"
          maxAvatarsAmount={8}
        />}
        {users && <div className="profile-header__board">board</div>}
        {/* {status && (
          <div className={cn('profile-header__status', { [`profile-header__status_theme_${statusTheme}`]: Boolean(statusTheme) })}>
            <Status text={status} isEditable={isEditableStatus} setUser={setUser} isBoldText={isBoldTextInStatus} />
          </div>
        )} */}
      </div>
    </div>
    <div className="profile-header__user-rating">
      {/* <div className="profile-header__user-position">#{userRatePosition}</div> */}
      <div className="profile-header__user-rate">{userRate}</div>
      <div className="profile-header__user-rate-title">RATE</div>
    </div>
  </div>
);

ProfileHeader.propTypes = {
  name: PropTypes.string,
  nickname: PropTypes.string,
  // status: PropTypes.string,
  // statusTheme: PropTypes.string,
  // userRatePosition: PropTypes.number,
  userRate: PropTypes.number,
  squareAvatar: PropTypes.bool,
  users: PropTypes.arrayOf(PropTypes.object),
  isEditableStatus: PropTypes.bool,
  // isBoldTextInStatus: PropTypes.bool,
  poweredBy: PropTypes.string,
};

ProfileHeader.defaultProps = {
  // status: '',
};

export default ProfileHeader;
