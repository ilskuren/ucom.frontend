import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Medium from './Medium';
import { setPostData, validatePost } from '../actions';
import { selectUser } from '../store/selectors';
import { parseContent } from '../utils/medium/mediumPost';

class PostFormEditor extends PureComponent {
  render() {
    return (
      <Medium
        value={this.props.post.data.description}
        onChange={(description) => {
          const data = parseContent(description);

          this.props.setPostData(data);
          this.props.validatePost();
        }}
      />
    );
  }
}

PostFormEditor.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  setPostData: PropTypes.func.isRequired,
  validatePost: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    user: selectUser(state),
    post: state.post,
  }),
  dispatch => bindActionCreators({
    setPostData,
    validatePost,
  }, dispatch),
)(PostFormEditor);
