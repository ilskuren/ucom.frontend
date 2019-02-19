import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import UserCard from '../../../UserCard/UserCard';
import urls from '../../../../utils/urls';
import { getFileUrl } from '../../../../utils/upload';
import { getPostById } from '../../../../store/posts';
import styles from './styles.css';
import { POST_TYPE_MEDIA_ID, POST_TYPE_REPOST_ID } from '../../../../utils/posts';
import { selectUser } from '../../../../store/selectors/user';
import OrgIcon from '../../../Icons/Organization.jsx';
import { USER_NEWS_FEED_ID } from '../../../../utils/feed.js';

const PostFeedHeader = (props) => {
  const post = getPostById(props.posts, props.postId);

  if (!post) {
    return null;
  }

  let entityForUser;
  if (props.feedTypeId !== USER_NEWS_FEED_ID) {
    entityForUser = '';
  } else if ((post.userId !== post.entityForCard.id) || (props.user.id !== post.entityForCard.id)) {
    entityForUser = post.entityForCard.accountName;
  } else if (post.post && props.postTypeId === POST_TYPE_REPOST_ID && (post.post.userId !== post.post.entityForCard.id || props.user.id !== post.post.entityForCard.id)) {
    entityForUser = post.post.entityForCard.accountName;
  }

  let entityForOrg;
  if (props.feedTypeId !== USER_NEWS_FEED_ID) {
    entityForOrg = '';
  } else if (post.post && props.postTypeId === POST_TYPE_REPOST_ID) {
    entityForOrg = post.post.entityForCard.title;
  } else {
    entityForOrg = post.entityForCard.title;
  }

  return (
    <Fragment>
      <div className={styles.header}>
        <div className={styles.info}>
          <Link to={urls.getFeedPostUrl(post)} className={styles.date}>{props.createdAt}</Link>
          {entityForUser !== '' && entityForUser !== undefined && post.entityNameFor.trim() === 'users' &&
            <Link to={urls.getUserUrl(post.entityForCard.id)}>@{entityForUser}</Link>
          }
          {entityForOrg !== '' && post.entityNameFor.trim() === 'org' && (
            <Fragment>
              <Link to={urls.getOrganizationUrl(post.entityForCard.id)}>
                {post.entityForCard && post.entityForCard.avatarFilename ? (
                  <img className={styles.orgImg} src={getFileUrl(post.entityForCard.avatarFilename)} alt="img" />
                ) : (
                  <OrgIcon className={styles.orgImg} />
                )}
              </Link>
              <Link to={urls.getOrganizationUrl(post.entityForCard.id)}>@{entityForOrg}</Link>
            </Fragment>
          )}
        </div>
      </div>

      { (props.userId && POST_TYPE_MEDIA_ID !== props.postTypeId) ? (
        <div className={styles.user}>
          <UserCard
            userId={props.userId}
          />
          {/* (entityForOrg !== '' && post.entityNameFor.trim() === 'org' && props.user.organizations.find(x => x.title === post.entityForCard.title) !== undefined) ? (
            <Fragment>
              {post.entityForCard && post.entityForCard.avatarFilename !== null ? (
                <img className={styles.orgImgSmall} src={getFileUrl(post.entityForCard.avatarFilename)} alt="img" />
              ) : (
                <OrgIcon className={styles.orgImgSmall} />
              )}
            </Fragment>
          ) : null */}
        </div>
      ) : null}
    </Fragment>
  );
};

PostFeedHeader.propTypes = {
  posts: PropTypes.objectOf(PropTypes.object).isRequired,
  createdAt: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
  feedTypeId: PropTypes.number,
  userId: PropTypes.number,
  postTypeId: PropTypes.number,
};

export default connect(state => ({
  posts: state.posts,
  users: state.users,
  user: selectUser(state),
}))(PostFeedHeader);
