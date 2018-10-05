import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const NotificationCard = ({
  isReplay = false, name, time, avatar, text, post, postCover, reply,
}) => (
  <Fragment>
    <div className="notification-card">
      <img alt={name} className="notification-card__avatar" src={avatar} />
      <div className="notification-card__content">
        <p className="notification-card__text">
          <strong>{name} </strong>
          {text}
          <strong> {post}</strong>
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
      {postCover && <img alt="" className="notification-card__post-cover" src={postCover} />}
    </div>
  </Fragment>
);

NotificationCard.propTypes = {
  isReplay: PropTypes.bool,
  name: PropTypes.string,
  time: PropTypes.string,
  avatar: PropTypes.string,
  text: PropTypes.string,
  postCover: PropTypes.string,
  post: PropTypes.string,
  reply: PropTypes.shape({
    replyText: PropTypes.string,
    replyTime: PropTypes.string,
  }),

};
export default NotificationCard;
