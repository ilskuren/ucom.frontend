import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../Avatar';
import { CongratulationsIcon } from '../Icons/FeedIcons';

const NotificationCardCongratulations = ({
  time, description,
}) => (
  <div className="notification-card notification-card_congratulations">
    <div className="notification-card__block">
      <div className="notification-card__avatar" >
        <Avatar srcComponent={<CongratulationsIcon />} />
      </div>
      <div className="notification-card__content">
        <div className="notification-card__text notification-card__description">
          <strong>Whooooooa! Сongratulations!</strong>
          <p className="notification-card__time">{time}</p>
        </div>
      </div>
    </div>
    <p className="notification-card__text_congratulations">{description}</p>
  </div>
);

NotificationCardCongratulations.propTypes = {
  // username: PropTypes.string,
  time: PropTypes.string,
  description: PropTypes.string,
  reply: PropTypes.shape({
    replyText: PropTypes.string,
    replyTime: PropTypes.string,
  }),

};
export default NotificationCardCongratulations;
