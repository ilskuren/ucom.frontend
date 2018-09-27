import PropTypes from 'prop-types';
import React from 'react';
import IconBell from '../Icons/BellOutlined';
import IconClose from '../Icons/Close';

const Notification = props => (
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
          <div className="notification__title">{props.title}</div>
        </div>
      </div>
    </div>
    <div className="notification__content">{props.message}</div>
  </div>
);

Notification.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
};

Notification.defaultProps = {
  title: 'Error',
};

export default Notification;
