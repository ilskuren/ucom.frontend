import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import UserCard from '../../../UserCard';
import urls from '../../../../utils/urls';
import { getPostById } from '../../../../store/posts';
import styles from './styles.css';
// import Avatar from '../../../Avatar';

const PostFeedHeader = (props) => {
  const post = getPostById(props.posts, props.postId);

  if (!post) {
    return null;
  }

  return (
    <Fragment>
      <div className={styles.header}>
        <div className={styles.info}>
          <Link to={urls.getFeedPostUrl(post)}>{props.createdAt}</Link>
        </div>
        {/* <div className={styles.avatarSmall}>
          <Avatar
            src={urls.getFileUrl(post.user.avatarFilename)}
            size="xmsmall"
            square="true"
          />
        </div>
        <div className={styles.info}>
          <Link to={urls.getFeedPostUrl(post)} />
        </div> */}
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
