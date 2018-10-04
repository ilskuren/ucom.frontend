import React from 'react';
import PropTypes from 'prop-types';

const NotificationItem = ({
  isReplay = false, recent = false, name, time, avatar, text, post, postCover, reply,
}) => (
  <div className={`notification-tooltip__item ${recent ? 'notification-tooltip__item_new' : ''}`}>
    <div className="notification-card">
      <img alt={name} className="notification-card__avatar" src={avatar} />
      <div className="notification-card__item__content">
        <p className="notification-card__text">
          <span className="notification-card__bold">{name} </span>
          {text}
          <span className="notification-card__bold"> {post}</span>
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
    <div className="notification-side">
      {postCover && <img alt="" className="notification-side__post__cover" src={postCover} />}
    </div>
  </div>
);

NotificationItem.propTypes = {
  isReplay: PropTypes.bool,
  recent: PropTypes.bool,
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
export default NotificationItem;
