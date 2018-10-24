import React from 'react';
import NotificationCardDefault from './NotificationCardDefault';

const NotificationCard = (props) => {
  switch (props.eventId) {
    default: {
      return (
        <NotificationCardDefault {...props} />
      );
    }
  }
};

export default NotificationCard;
