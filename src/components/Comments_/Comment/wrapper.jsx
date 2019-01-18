import { connect } from 'react-redux';
import Comment from './index';
import { selectUser } from '../../../store/selectors/user';
import urls from '../../../utils/urls';
import { getUserName } from '../../../utils/user';
import { createComment } from '../../../actions/comments';

export default connect(
  (state, props) => ({
    ...props,
    ownerImageUrl: urls.getFileUrl(selectUser(state).avatarFilename),
    ownerPageUrl: urls.getUserUrl(selectUser(state).id),
    ownerName: getUserName(selectUser(state)),
  }),
  (dispatch, props) => ({
    onSubmit: message => dispatch(createComment({
      postId: props.postId,
      data: { description: message },
    })),
  }),
)(Comment);
