import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import BellIcon from './Icons/BellOutlined';

const NotificationSign = props => (
  <div className={cn('notification-sign', { [`notification-sign_${props.type}`]: Boolean(props.type) })}>
    <BellIcon />
  </div>
);

NotificationSign.propTypes = {
  type: PropTypes.string,
};

export default NotificationSign;
