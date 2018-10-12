import React from 'react';
import NotificationCardCongratulations from './NotificationCardCongratulations';
import NotificationCardDefault from './NotificationCardDefault';

const CONGRATULATIONS = 'congratulations';

const NotificationCard = (props) => {
  switch (props.typeOfFeedIcon) {
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
