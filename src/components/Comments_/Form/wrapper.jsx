import { connect } from 'react-redux';
import Form from './index';
import { selectUser } from '../../../store/selectors/user';
import urls from '../../../utils/urls';
import { getUserName } from '../../../utils/user';
import { createComment } from '../../../actions/comments';

export default connect(
  (state, props) => ({
    ...props,
    userImageUrl: urls.getFileUrl(selectUser(state).avatarFilename),
    userPageUrl: urls.getUserUrl(selectUser(state).id),
    userName: getUserName(selectUser(state)),
  }),
  (dispatch, props) => ({
    onSubmit: message => dispatch(createComment({
      postId: props.postId,
      data: { description: message },
    })),
  }),
)(Form);
