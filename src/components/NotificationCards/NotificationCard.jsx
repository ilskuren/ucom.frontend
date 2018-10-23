import { Link } from 'react-router-dom';
import React, { Fragment } from 'react';
import NotificationCardCongratulations from './NotificationCardCongratulations';
import NotificationCardDefault from './NotificationCardDefault';
import { getPostUrl } from '../../utils/posts';
import { DownvoteIcon, UpvoteIcon, SuccessIcon } from '../Icons/FeedIcons';
import { getUserName, getUserUrl } from '../../utils/user';
import { getFileUrl } from '../../utils/upload';
import {
  CONGRATULATIONS_EVENT_ID,
  USER_UPVOTES_YOUR_POST,
  USER_DOWNVOTES_YOUR_POST,
  USER_FOLLOWS_YOU,
  USER_UPVOTES_YOUR_COMMENT,
  USER_DOWNVOTES_YOUR_COMMENT,
} from '../../store/siteNotifications';

const NotificationCard = (props) => {
  switch (props.eventId) {
    case CONGRATULATIONS_EVENT_ID: {
      return (
        <NotificationCardCongratulations {...props} />
      );
    }

    case USER_DOWNVOTES_YOUR_COMMENT:
    case USER_UPVOTES_YOUR_POST: {
      return (
        <NotificationCardDefault
          title={(
            <Fragment>
              <Link to={getUserUrl(props.data.user.id)}>
                <strong>{getUserName(props.data.user)}</strong>
              </Link>
              {`${props.eventId === USER_UPVOTES_YOUR_POST ? ' upvote' : ' downvote'} your post`}
            </Fragment>
          )}
          userUrl={getUserUrl(props.data.user.id)}
          userAvatarSrc={getFileUrl(props.data.user.avatarFilename)}
          userAvatarIcon={props.eventId === USER_UPVOTES_YOUR_POST ? <UpvoteIcon /> : <DownvoteIcon />}
          postUrl={getPostUrl(props.targetEntity.post.id)}
          postAvatarSrc={getFileUrl(props.targetEntity.post.mainImageFilename)}
          createAt={props.createAt}
        />
      );
    }

    case USER_DOWNVOTES_YOUR_POST:
    case USER_UPVOTES_YOUR_COMMENT: {
      return (
        <NotificationCardDefault
          title={(
            <Fragment>
              <Link to={getUserUrl(props.data.user.id)}>
                <strong>{getUserName(props.data.user)}</strong>
              </Link>
              {`${props.eventId === USER_UPVOTES_YOUR_COMMENT ? ' upvote' : ' downvote'} your comment`}
            </Fragment>
          )}
          userUrl={getUserUrl(props.data.user.id)}
          userAvatarSrc={getFileUrl(props.data.user.avatarFilename)}
          userAvatarIcon={props.eventId === USER_UPVOTES_YOUR_COMMENT ? <UpvoteIcon /> : <DownvoteIcon />}
          postUrl={getPostUrl(props.targetEntity.post.id)}
          postAvatarSrc={getFileUrl(props.targetEntity.post.mainImageFilename)}
          createAt={props.createAt}
        />
      );
    }

    case USER_FOLLOWS_YOU: {
      return (
        <NotificationCardDefault
          title={(
            <Fragment>
              <Link to={getUserUrl(props.data.user.id)}>
                <strong>{getUserName(props.data.user)}</strong>
              </Link>
              &nbsp;started following you
            </Fragment>
          )}
          userUrl={getUserUrl(props.data.user.id)}
          userAvatarSrc={getFileUrl(props.data.user.avatarFilename)}
          userAvatarIcon={<SuccessIcon />}
          createAt={props.createAt}
        />
      );
    }

    default: {
      return null;
    }
  }
};

export default NotificationCard;
