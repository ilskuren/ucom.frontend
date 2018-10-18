import React from 'react';
import NotificationCardCongratulations from './NotificationCardCongratulations';
import NotificationCardDefault from './NotificationCardDefault';

const CONGRATULATIONS_EVENT_ID = 10;

const NotificationCard = (props) => {
  switch (props.eventId) {
    case CONGRATULATIONS_EVENT_ID: {
      return (
        <NotificationCardCongratulations {...props} />
      );
    }

    default: {
      return <NotificationCardDefault {...props} />;
    }
  }
};
export default NotificationCard;
