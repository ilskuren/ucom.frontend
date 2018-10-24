import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import React, { Fragment } from 'react';
import Avatar from '../Avatar';
import { getPostUrl } from '../../utils/posts';
import { DownvoteIcon, UpvoteIcon, SuccessIcon } from '../Icons/FeedIcons';
import { getUserName, getUserUrl } from '../../utils/user';
import { getFileUrl } from '../../utils/upload';
import { getOrganizationUrl } from '../../utils/organization';

import {
  USER_FOLLOWS_YOU,
  USER_UPVOTES_YOUR_POST,
  USER_DOWNVOTES_YOUR_POST,
  USER_UPVOTES_YOUR_COMMENT,
  USER_DOWNVOTES_YOUR_COMMENT,
  USER_FOLLOWS_ORG,
  USER_UPVOTES_ORG_POST,
  USER_DOWNVOTES_ORG_POST,
  USER_UPVOTES_ORG_COMMENT,
  USER_DOWNVOTES_ORG_COMMENT,
  USER_CREATES_DIRECT_POST_FOR_YOU,
  USER_COMMENTS_YOUR_POST,
  USER_LEAVES_COMMENT_ON_YOUR_COMMENT,
  USER_CREATES_DIRECT_POST_FOR_ORG,
  USER_COMMENTS_ORG_POST,
  USER_LEAVES_COMMENT_ON_ORG_COMMENT,
} from '../../store/siteNotifications';

const getAvatarIcon = (eventId) => {
  switch (eventId) {
    case USER_FOLLOWS_ORG:
    case USER_FOLLOWS_YOU:
      return <SuccessIcon />;

    case USER_UPVOTES_ORG_COMMENT:
    case USER_UPVOTES_ORG_POST:
    case USER_UPVOTES_YOUR_COMMENT:
    case USER_UPVOTES_YOUR_POST:
      return <UpvoteIcon />;

    case USER_DOWNVOTES_ORG_COMMENT:
    case USER_DOWNVOTES_ORG_POST:
    case USER_DOWNVOTES_YOUR_COMMENT:
    case USER_DOWNVOTES_YOUR_POST:
      return <DownvoteIcon />;

    default:
      return null;
  }
};

const getTitle = (props) => {
  switch (props.eventId) {
    case USER_FOLLOWS_YOU:
      return (
        <Fragment>
          <Link to={getUserUrl(props.data.user.id)}>
            <strong>{getUserName(props.data.user)}</strong>
          </Link>
          &nbsp;started following you
        </Fragment>
      );

    case USER_UPVOTES_YOUR_POST:
    case USER_DOWNVOTES_YOUR_POST:
      return (
        <Fragment>
          <Link to={getUserUrl(props.data.user.id)}>
            <strong>{getUserName(props.data.user)}</strong>
          </Link>
          {`${props.eventId === USER_UPVOTES_YOUR_POST ? ' upvote' : ' downvote'} your post`}
        </Fragment>
      );

    case USER_DOWNVOTES_YOUR_COMMENT:
    case USER_UPVOTES_YOUR_COMMENT:
      return (
        <Fragment>
          <Link to={getUserUrl(props.data.user.id)}>
            <strong>{getUserName(props.data.user)}</strong>
          </Link>
          {`${props.eventId === USER_UPVOTES_YOUR_COMMENT ? ' upvote' : ' downvote'} your comment`}
        </Fragment>
      );

    case USER_FOLLOWS_ORG:
      return (
        <Fragment>
          <Link to={getUserUrl(props.data.user.id)}>
            <strong>{getUserName(props.data.user)}</strong>
          </Link>
          &nbsp;started following&nbsp;
          <Link to={getOrganizationUrl(props.targetEntity.organization.id)}>
            <strong>{props.targetEntity.organization.title}</strong>
          </Link>
        </Fragment>
      );

    case USER_DOWNVOTES_ORG_POST:
    case USER_UPVOTES_ORG_POST:
      return (
        <Fragment>
          <Link to={getUserUrl(props.data.user.id)}>
            <strong>{getUserName(props.data.user)}</strong>
          </Link>
          {props.eventId === USER_UPVOTES_ORG_POST ? ' upvote ' : ' downvote '}
          <Link to={getOrganizationUrl(props.targetEntity.organization.id)}>
            <strong>{props.targetEntity.organization.title}</strong>
          </Link>
          ’s post
        </Fragment>
      );

    case USER_DOWNVOTES_ORG_COMMENT:
    case USER_UPVOTES_ORG_COMMENT:
      return (
        <Fragment>
          <Link to={getUserUrl(props.data.user.id)}>
            <strong>{getUserName(props.data.user)}</strong>
          </Link>
          {props.eventId === USER_UPVOTES_ORG_COMMENT ? ' upvote ' : ' downvote '}
          <Link to={getOrganizationUrl(props.targetEntity.organization.id)}>
            <strong>{props.targetEntity.organization.title}</strong>
          </Link>
          ’s comment
        </Fragment>
      );

    case USER_CREATES_DIRECT_POST_FOR_YOU:
      return (
        <Fragment>
          <Link to={getUserUrl(props.data.post.user.id)}>
            <strong>{getUserName(props.data.post.user)}</strong>
          </Link>
          &nbsp;posted on your profile:&nbsp;
          {props.data.post.description}
        </Fragment>
      );

    case USER_COMMENTS_YOUR_POST:
      return (
        <Fragment>
          <Link to={getUserUrl(props.data.user.id)}>
            <strong>{getUserName(props.data.user)}</strong>
          </Link>
          &nbsp;commented on your post
        </Fragment>
      );

    case USER_LEAVES_COMMENT_ON_YOUR_COMMENT:
      return (
        <Fragment>
          <Link to={getUserUrl(props.data.user.id)}>
            <strong>{getUserName(props.data.user)}</strong>
          </Link>
          &nbsp;replied to your comment
        </Fragment>
      );

    case USER_CREATES_DIRECT_POST_FOR_ORG:
      return (
        <Fragment>
          <Link to={getUserUrl(props.data.post.user.id)}>
            <strong>{getUserName(props.data.post.user)}</strong>
          </Link>
          &nbsp;posted in&nbsp;
          {props.targetEntity.organization.title}
          ’s feed:&nbsp;
          {props.data.post.description}
        </Fragment>
      );

    case USER_COMMENTS_ORG_POST:
      return (
        <Fragment>
          <Link to={getUserUrl(props.data.user.id)}>
            <strong>{getUserName(props.data.user)}</strong>
          </Link>
          &nbsp;commented&nbsp;
          {props.targetEntity.organization.title}
          ’s post
        </Fragment>
      );

    case USER_LEAVES_COMMENT_ON_ORG_COMMENT:
      return (
        <Fragment>
          <Link to={getUserUrl(props.data.user.id)}>
            <strong>{getUserName(props.data.user)}</strong>
          </Link>
          &nbsp;replied to&nbsp;
          {props.targetEntity.organization.title}
          ’s comment
        </Fragment>
      );

    default:
      return null;
  }
};

const getCover = (props) => {
  if (!props.targetEntity) {
    return null;
  }

  if (props.targetEntity.post) {
    return (
      <div className="site-notification__cover">
        <Link to={getPostUrl(props.targetEntity.post.id)}>
          <Avatar src={getFileUrl(props.targetEntity.post.mainImageFilename)} square />
        </Link>
      </div>
    );
  }

  if (props.targetEntity.organization) {
    return (
      <div className="site-notification__cover">
        <Link to={getOrganizationUrl(props.targetEntity.organization.id)}>
          <Avatar src={getFileUrl(props.targetEntity.organization.mainImageFilename)} square />
        </Link>
      </div>
    );
  }

  return null;
};

const getAvatar = (props) => {
  switch (props.eventId) {
    case USER_CREATES_DIRECT_POST_FOR_YOU:
      return (
        <div className="site-notification__avatar">
          <Link to={getUserUrl(props.data.post.user.id)}>
            <Avatar
              src={getFileUrl(props.data.post.user.avatarFilename)}
              icon={getAvatarIcon(props.eventId)}
            />
          </Link>
        </div>
      );

    default: {
      return props.data && props.data.user ? (
        <div className="site-notification__avatar">
          <Link to={getUserUrl(props.data.user.id)}>
            <Avatar
              src={getFileUrl(props.data.user.avatarFilename)}
              icon={getAvatarIcon(props.eventId)}
            />
          </Link>
        </div>
      ) : null;
    }
  }
};

const getContent = (props) => {
  switch (props.eventId) {
    case USER_LEAVES_COMMENT_ON_ORG_COMMENT:
    case USER_COMMENTS_ORG_POST:
    case USER_LEAVES_COMMENT_ON_YOUR_COMMENT:
    case USER_COMMENTS_YOUR_POST:
      return (
        <div className="site-notification__content">
          <div className="site-notification__title">{getTitle(props)}</div>
          <div className="site-notification__quote">
            <div className="site-notification__comment">{props.data.comment.description}</div>
            {props.createdAt && (
              <div className="site-notification__time">{moment(props.createdAt).fromNow()}</div>
            )}
          </div>
        </div>
      );

    default:
      return (
        <div className="site-notification__content">
          <div className="site-notification__title">{getTitle(props)}</div>
          {props.createdAt && (
            <div className="site-notification__time">{moment(props.createdAt).fromNow()}</div>
          )}
        </div>
      );
  }
};

const NotificationCardDefault = props => (
  <div className="site-notification">
    {getAvatar(props)}
    {getContent(props)}
    {getCover(props)}
  </div>
);

getContent.propTypes = {
  createdAt: PropTypes.string,
};

getAvatar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  eventId: PropTypes.number,
};

getCover.propTypes = {
  targetEntity: PropTypes.objectOf(PropTypes.any),
};

export default NotificationCardDefault;
