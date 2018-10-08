import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';

const NotificationCard = ({
  isReplay = false, username, time, avatar, description, relatingPost, postCover, reply,
}) => (
  <Fragment>
    <div className="notification-card">

      <div className="notification-card__avatar" >
        <Avatar alt={username} src={avatar} />
      </div>
      <div className="notification-card__content">
        <p className="notification-card__text">
          <strong>{username} </strong>
          {description}
          <strong> {relatingPost}</strong>
        </p>

        {!isReplay && <p className="notification-card__time">{time}</p>}

        {isReplay && (
          <div className="notification-card__reply">
            <p className="notification-card__text">{reply.replyText}</p>
            <p className="notification-card__time">{reply.replyTime}</p>
          </div>
        )}
      </div>
    </div>
    <div className="notification-card__side">
      {postCover &&
      <div alt="" className="notification-card__post-cover">
        <Avatar src={postCover} square />
      </div>}
    </div>
  </Fragment>
);

NotificationCard.propTypes = {
  isReplay: PropTypes.bool,
  username: PropTypes.string,
  time: PropTypes.string,
  avatar: PropTypes.string,
  description: PropTypes.string,
  postCover: PropTypes.string,
  relatingPost: PropTypes.string,
  reply: PropTypes.shape({
    replyText: PropTypes.string,
    replyTime: PropTypes.string,
  }),

};
export default NotificationCard;
