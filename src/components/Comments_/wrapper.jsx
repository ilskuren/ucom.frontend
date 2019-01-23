import moment from 'moment';
import { connect } from 'react-redux';
import Comments from './index';
import { getPostById } from '../../store/posts';
import { getCommentById } from '../../store/comments';
import urls from '../../utils/urls';
import { getUserName } from '../../utils/user';
import { createComment, getPostComments, getCommentsOnComment } from '../../actions/comments';
import { sortCommentsFn } from '../../utils/comments';

export default connect(
  (state, props) => {
    const post = getPostById(state.posts, props.postId);
    let comments = [];
    let metadata = {};

    if (post.comments) {
      comments = post.comments.data
        .map(id => getCommentById(state.comments, id))
        .sort(sortCommentsFn)
        .map(comment => ({
          id: comment.id,
          depth: comment.depth,
          text: comment.description,
          date: moment(comment.createdAt).fromNow(),
          userId: comment.userId,
          nextDepthTotalAmount: comment.metadata.nextDepthTotalAmount,
          parentId: comment.parentId || 0,
        }));
      ({ metadata } = post.comments);
    }

    return ({
      ...props,
      metadata,
      comments,
      ownerImageUrl: urls.getFileUrl(state.user.data.avatarFilename),
      ownerPageUrl: urls.getUserUrl(state.user.data.id),
      ownerName: getUserName(state.user.data),
    });
  },

  dispatch => ({
    onSubmit: ({ message, postId, commentId }) => {
      dispatch(createComment({
        postId,
        commentId,
        data: {
          description: message,
        },
      }));
    },

    onClickShowNext: ({ postId, page, perPage }) => {
      dispatch(getPostComments({ postId, page, perPage }));
    },

    onClickShowReplies: ({
      postId, parentId, parentDepth, page, perPage,
    }) => {
      dispatch(getCommentsOnComment({
        postId, parentId, parentDepth, page, perPage,
      }));
    },
  }),
)(Comments);
