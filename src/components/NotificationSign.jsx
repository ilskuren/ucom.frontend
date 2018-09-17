import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import BellIcon from './Icons/BellOutlined';

const NotificationSign = props => (
  <div className={cn('notification-sign', { [`notification-sign_${props.theme}`]: Boolean(props.theme) })}>
    <BellIcon />
  </div>
);

NotificationSign.propTypes = {
  theme: PropTypes.string,
};

export default NotificationSign;
