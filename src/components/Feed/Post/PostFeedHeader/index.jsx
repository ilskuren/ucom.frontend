import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import UserCard from '../../../UserCard';
// import { POST_TYPE_REPOST_ID } from '../../../../utils/posts';
import urls from '../../../../utils/urls';
import { getPostById } from '../../../../store/posts';
import styles from './PostFeedHeader.css';
import Avatar from '../../../Avatar';

const PostFeedHeader = (props) => {
  const post = getPostById(props.posts, props.postId);

  if (!post) {
    return null;
  }

  // if (this.props.owner !== this.props.accountName && this.props.accountName === post.user.accountName) {
  //   ownerFeed = this.props.accountName;
  // }

  return (
    <Fragment>
      <div className={styles.header}>
        {/* props.postTypeId === POST_TYPE_REPOST_ID */}
        <div className={styles.info}>
          <Link to={urls.getFeedPostUrl(post)}>{props.createdAt}</Link>
        </div>
        <div className={styles.avatarSmall}>
          <Avatar
            src={urls.getFileUrl(post.user.avatarFilename)}
            size="xmsmall"
            square="true"
          />
        </div>
        <div className={styles.info}>
          <Link to={urls.getFeedPostUrl(post)}>@a</Link>
        </div>
      </div>

      {props.accountName && (
        <div className={styles.user}>
          <UserCard
            sign="@"
            userName={props.userName}
            accountName={props.accountName}
            profileLink={props.profileLink}
            avatarUrl={props.avatarUrl}
            rate={props.userRate}
          />
        </div>
      )}
    </Fragment>
  );
};

PostFeedHeader.propTypes = {
  // postTypeId: PropTypes.number,
  createdAt: PropTypes.string,
  postId: PropTypes.number,
  accountName: PropTypes.string,
  userName: PropTypes.string,
  profileLink: PropTypes.string,
  avatarUrl: PropTypes.string,
};

export default connect(state => ({
  posts: state.posts,
}))(PostFeedHeader);
