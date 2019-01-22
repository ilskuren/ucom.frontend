import moment from 'moment';
import { connect } from 'react-redux';
import Comments from './index';
import { getPostById } from '../../store/posts';
import { getCommentById } from '../../store/comments';
import urls from '../../utils/urls';
import { getUserName } from '../../utils/user';

export default connect(
  (state, props) => {
    const post = getPostById(state.posts, props.postId);
    const comments = post && post.comments ?
      post.comments.data.map(id => getCommentById(state.comments, id)) : [];

    return ({
      ...props,
      comments: comments.map(comment => ({
        id: comment.id,
        text: comment.description,
        date: moment(comment.createdAt).fromNow(),
        userId: comment.userId,
      })),
      ownerImageUrl: urls.getFileUrl(state.user.avatarFilename),
      ownerPageUrl: urls.getUserUrl(state.user.id),
      ownerName: getUserName(state.user),
    });
  },
  () => ({
    onSubmit: message => console.log(message),
  }),
)(Comments);
