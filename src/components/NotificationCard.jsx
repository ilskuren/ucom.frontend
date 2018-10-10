import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import { DownvoteIcon, UpvoteIcon, MentionedIcon, ShareIcon } from './Icons/FeedIcons';

const UPVOTE = 'upvote';
const DOWNVOTE = 'downvote';
const SHARE = 'share';
const MENTIONED = 'mentioned';

const getSvgFeedIcon = (nameOfIcon) => {
  switch (nameOfIcon) {
    case UPVOTE:
      return <UpvoteIcon />;
    case DOWNVOTE:
      return <DownvoteIcon />;
    case SHARE:
      return <ShareIcon />;
    case MENTIONED:
      return <MentionedIcon />;
    default:
      return '';
  }
};
const NotificationCard = ({
  isReplay = false, username, time, avatar, description, relatingPost, postCover, reply, typeOfFeedIcon = '',
}) => (
  <Fragment>
    <div className="notification-card">

      <div className="notification-card__avatar" >
        <Avatar alt={username} src={avatar} icon={getSvgFeedIcon(typeOfFeedIcon)} />
      </div>
      <div className="notification-card__content">
        <div className="notification-card__text notification-card__description">
          <strong>{username} </strong>
          {description}
          <strong> {relatingPost}</strong>
          {!isReplay && <p className="notification-card__time">{time}</p>}
        </div>

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
  typeOfFeedIcon: PropTypes.string,
  reply: PropTypes.shape({
    replyText: PropTypes.string,
    replyTime: PropTypes.string,
  }),

};
export default NotificationCard;
