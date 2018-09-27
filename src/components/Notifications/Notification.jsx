import React from 'react';
import NotificationError from 'components/Notifications/Error';
import { NOTIFICATION_TYPE_ERROR } from '../../store/notifications';

const Notification = (props) => {
  switch (props.type) {
    case NOTIFICATION_TYPE_ERROR: {
      return (
        <NotificationError
          message={props.message}
          title={props.title}
        />
      );
    }

    default: {
      return null;
    }
  }
};

export default Notification;
