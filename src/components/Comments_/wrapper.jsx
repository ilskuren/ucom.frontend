import moment from 'moment';
import { connect } from 'react-redux';
import Comments from './index';
import { getCommentById, getCommentsByContainer } from '../../store/comments';
import urls from '../../utils/urls';
import { getUserName } from '../../utils/user';
import { getCommentsTree, COMMENTS_CONTAINER_ID_FEED_POST } from '../../utils/comments';
import { createComment, getPostComments, getCommentsOnComment } from '../../actions/comments';

// TODO: Добавить юзеров в комментов в стор всех юзеров

export default connect(
  (state, props) => {
    const commentsData = getCommentsByContainer(state, COMMENTS_CONTAINER_ID_FEED_POST, props.postId);
    let comments = [];
    let metadata = {};

    if (commentsData) {
      comments = getCommentsTree(commentsData.commentIds
        .map(id => getCommentById(state.comments, id))
        .map(comment => ({
          id: comment.id,
          depth: comment.depth,
          text: comment.description,
          date: moment(comment.createdAt).fromNow(),
          userId: comment.userId,
          nextDepthTotalAmount: comment.metadata.nextDepthTotalAmount,
          parentId: comment.parentId || 0,
          path: comment.path,
          createdAt: comment.createdAt,
        })));

      ({ metadata } = commentsData);
    }

    return ({
      ...props,
      metadata,
      comments,
      ownerId: state.user.data.id,
      ownerImageUrl: urls.getFileUrl(state.user.data.avatarFilename),
      ownerPageUrl: urls.getUserUrl(state.user.data.id),
      ownerName: getUserName(state.user.data),
    });
  },

  dispatch => ({
    onSubmit: ({ message, postId, commentId }) => {
      dispatch(createComment({
        containerId: COMMENTS_CONTAINER_ID_FEED_POST,
        postId,
        commentId,
        data: {
          description: message,
        },
      }));
    },

    onClickShowNext: ({ postId, page, perPage }) => {
      dispatch(getPostComments({
        containerId: COMMENTS_CONTAINER_ID_FEED_POST,
        postId,
        page,
        perPage,
      }));
    },

    onClickShowReplies: ({
      postId, parentId, parentDepth, page, perPage,
    }) => {
      dispatch(getCommentsOnComment({
        containerId: COMMENTS_CONTAINER_ID_FEED_POST,
        commentableId: postId,
        parentId,
        parentDepth,
        page,
        perPage,
      }));
    },
  }),
)(Comments);
