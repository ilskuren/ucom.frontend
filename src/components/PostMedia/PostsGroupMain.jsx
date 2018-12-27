import { connect } from 'react-redux';
import PostsGroup from './PostsGroup';

export default connect(
  state => ({
    posts: state.mainPostGroup.posts,
  }),
  null,
)(PostsGroup);
