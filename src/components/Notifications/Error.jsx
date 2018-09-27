import React from 'react';
import IconBell from '../Icons/BellOutlined';
import IconClose from '../Icons/Close';

const Notification = () => (
  <div className="notification notification_error">
    <div className="notification__close">
      <IconClose />
    </div>
    <div className="notification__header">
      <div className="inline inline_medium">
        <div className="inline__item">
          <div className="notification__icon">
            <IconBell />
          </div>
        </div>
        <div className="inline__item">
          <div className="notification__title">Text notification</div>
        </div>
      </div>
    </div>
    <div className="notification__content">
      Check out the real pixels and tell me what you think of it. Also dont forget to follow Degordian team and stay updated for more shot.
    </div>
  </div>
);

export default Notification;
