import React from 'react';
import NotificationCardCongratulations from './NotificationCardCongratulations';
import NotificationCardDefault from './NotificationCardDefault';

const CONGRATULATIONS = 10;

const NotificationCard = (props) => {
  switch (props.eventId) {
    case CONGRATULATIONS: {
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
