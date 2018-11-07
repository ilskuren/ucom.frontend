import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostRating from '../Rating/PostRating';
import UserCard from '../UserCard';
import { selectUser } from '../../store/selectors/user';
import { getUserById } from '../../store/users';
import { getFileUrl } from '../../utils/upload';
import { getUserName, getUserUrl } from '../../utils/user';

class PostFeedHeader extends PureComponent {
  render() {
    const user = getUserById(this.props.users, this.props.userId);

    return (
      <div className="post__header">
        <div className="post__info-block">
          <div className="post__type"><strong>{this.props.postTypeId}</strong></div>
          <div className="toolbar__main">{this.props.updatedAt}</div>
          <div className="toolbar__side">
            <PostRating postId={this.props.postId} />
          </div>
        </div>


        {user && (
          <div className="post__user">
            <UserCard
              sign="@"
              userName={getUserName(user)}
              accountName={user.accountName}
              profileLink={getUserUrl(user.id)}
              avatarUrl={getFileUrl(user.avatarFilename)}
            />
          </div>
        )}
      </div>
    );
  }
}

PostFeedHeader.propTypes = {
  postTypeId: PropTypes.string,
  updatedAt: PropTypes.string,
  postId: PropTypes.number,
  userId: PropTypes.number,
  users: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(state => ({
  users: state.users,
  user: selectUser(state),
}))(PostFeedHeader);
