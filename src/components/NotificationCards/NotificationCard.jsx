import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import React, { Fragment } from 'react';
import Avatar from '../Avatar';
import Button from '../Button';
import { getPostUrl, getPinnedPostUrl } from '../../utils/posts';
import { DownvoteIcon, UpvoteIcon, SuccessIcon } from '../Icons/FeedIcons';
import InputErrorIcon from '../Icons/InputError';
import InputCompleteIcon from '../Icons/InputComplete';
import { getUserName, getUserUrl } from '../../utils/user';
import { getFileUrl } from '../../utils/upload';
import { getOrganizationUrl } from '../../utils/organization';
import { confirmNotification, declineNotification, seenNotification } from '../../actions/siteNotifications';

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
  CONGRATULATIONS_EVENT_ID,
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
          &nbsp;posted on your&nbsp;
          <Link to={getPinnedPostUrl(props.data.post)}>
            <strong>profile</strong>
          </Link>
        </Fragment>
      );

    case USER_COMMENTS_YOUR_POST:
      return (
        <Fragment>
          <Link to={getUserUrl(props.data.comment.user.id)}>
            <strong>{getUserName(props.data.comment.user)}</strong>
          </Link>
          &nbsp;commented on your&nbsp;
          <Link to={getPinnedPostUrl(props.data.comment.post)}>
            <strong>post</strong>
          </Link>
        </Fragment>
      );

    case USER_LEAVES_COMMENT_ON_YOUR_COMMENT:
      return (
        <Fragment>
          <Link to={getUserUrl(props.data.comment.userId)}>
            <strong>{getUserName(props.data.comment.user)}</strong>
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
          <Link to={getPinnedPostUrl(props.data.post)}>
            <strong>{props.targetEntity.organization.nickname}</strong>
          </Link>
          ’s feed
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

    case CONGRATULATIONS_EVENT_ID:
      return (
        <Fragment>
          {props.data.user && (
            <Fragment>
              <Link to={getUserUrl(props.data.user.id)}>
                <strong>{getUserName(props.data.user)}</strong>
              </Link>
              &nbsp;
            </Fragment>
          )}
          invites you to become a member of&nbsp;
          <Link to={getOrganizationUrl(props.data.organization.id)}>
            <strong>{props.data.organization.title}</strong>
          </Link>
        </Fragment>
      );

    default:
      return null;
  }
};

const getCover = (props) => {
  switch (props.eventId) {
    case CONGRATULATIONS_EVENT_ID:
      return props.data.organization && props.data.organization.avatar_filename ? (
        <div className="site-notification__cover">
          <Link to={getPostUrl(props.data.organization.id)}>
            <Avatar src={getFileUrl(props.data.organization.avatarFilename)} square />
          </Link>
        </div>
      ) : null;

    default: {
      if (!props.targetEntity) {
        return null;
      }

      if (props.targetEntity.post && props.targetEntity.post.mainImageFilename) {
        return (
          <div className="site-notification__cover">
            <Link to={getPostUrl(props.targetEntity.post.id)}>
              <Avatar src={getFileUrl(props.targetEntity.post.mainImageFilename)} square />
            </Link>
          </div>
        );
      }

      if (props.targetEntity.organization && props.targetEntity.organization.avatarFilename) {
        return (
          <div className="site-notification__cover">
            <Link to={getOrganizationUrl(props.targetEntity.organization.id)}>
              <Avatar src={getFileUrl(props.targetEntity.organization.avatarFilename)} square />
            </Link>
          </div>
        );
      }

      return null;
    }
  }
};

const getAvatar = (props) => {
  switch (props.eventId) {
    case USER_CREATES_DIRECT_POST_FOR_ORG:
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

    case USER_LEAVES_COMMENT_ON_YOUR_COMMENT:
    case USER_COMMENTS_YOUR_POST:
      return (
        <div className="site-notification__avatar">
          <Link to={getUserUrl(props.data.comment.user.id)}>
            <Avatar src={getFileUrl(props.data.comment.user.avatarFilename)} />
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

const getActions = (props) => {
  switch (props.eventId) {
    case CONGRATULATIONS_EVENT_ID:
      return (
        <div className="site-notification__actions">
          <div className="inline">
            {props.confirmed === 0 ? (
              <Fragment>
                <div className="inline__item">
                  <Button
                    theme="accent-light"
                    size="small"
                    text="Confirm"
                    isStretched
                    onClick={() => props.confirmNotification({
                      id: props,
                      idOfOrg: props.data.organization.id,
                    })}
                  />
                </div>

                <div className="inline__item">
                  <Button
                    theme="accent-gray"
                    size="small"
                    text="Decline"
                    isStretched
                    onClick={() => props.declineNotification(props.id)}
                  />
                </div>
              </Fragment>
            ) : (
              <div className="inline__item">
                <div className="site-notification__confirmed-action">
                  <span className="inline inline_small">
                    <span className="inline__item">{props.confirmed === 1 ? 'Accepted' : 'Declined'}</span>
                    <span className="inline__item">
                      {props.confirmed === 1 ? <InputCompleteIcon /> : <InputErrorIcon />}
                    </span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      );

    default:
      return null;
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
          {getActions(props)}
        </div>
      );
  }
};

const NotificationCardDefault = props => (
  <div
    className="site-notification"
    onMouseEnter={() => {
      if (!props.finished) {
        props.seenNotification(props.id);
      }
    }}
  >
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

NotificationCardDefault.propTypes = {
  id: PropTypes.number,
  seenNotification: PropTypes.func,
  finished: PropTypes.bool,
};

export default connect(
  null,
  dispatch => bindActionCreators({
    confirmNotification,
    declineNotification,
    seenNotification,
  }, dispatch),
)(NotificationCardDefault);
