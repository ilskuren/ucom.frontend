import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import PostForm from '../components/PostForm';
import OfferForm from '../components/OfferForm';
import { setPostData, validatePost, resetPost, showAuthPopup } from '../actions';
import api from '../api';
import { getPostUrl } from '../utils/posts';
import { selectUser } from '../store/selectors';

class CreatePost extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.props.setPostData({ post_type_id: +this.props.match.params.postTypeId || 1 });

    if (this.props.match.params.id) {
      this.getData(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.match.params.id && nextProp.match.params.id !== this.props.match.params.id) {
      this.getData(nextProp.match.params.id);
    }

    if (nextProp.match.params.postTypeId && nextProp.match.params.postTypeId !== this.props.match.params.postTypeId) {
      this.props.resetPost();
      this.props.setPostData({ post_type_id: +nextProp.match.params.postTypeId });
    }
  }

  componentWillUnmount() {
    this.props.resetPost();
  }

  getData(id) {
    this.props.resetPost();

    api.getPost(id).then((data) => {
      this.props.setPostData(data);
    });
  }

  save() {
    if (!this.props.user.id) {
      this.props.showAuthPopup();
      return;
    }

    if (!this.props.post.isValid) {
      this.props.validatePost();
      return;
    }

    const saveFn = this.props.match.params.id ? api.updatePost : api.createPost;

    this.setState({ loading: true }, () => {
      saveFn(this.props.post.data, this.props.match.params.id)
        .then((data) => {
          this.setState({ loading: false });
          this.props.history.push(getPostUrl(data.id || data.post_id));
        });
    });
  }

  render() {
    switch (this.props.post.data.post_type_id) {
      case 2:
        return (
          <OfferForm
            onClickSave={() => this.save()}
            loading={this.state.loading}
          />
        );
      default:
        return (
          <PostForm
            onClickSave={() => this.save()}
            loading={this.state.loading}
          />
        );
    }
  }
}

CreatePost.propTypes = {
  resetPost: PropTypes.func,
  setPostData: PropTypes.func,
  validatePost: PropTypes.func,
  showAuthPopup: PropTypes.func,
  post: PropTypes.objectOf(PropTypes.any),
};

export default connect(
  state => ({
    user: selectUser(state),
    post: state.post,
  }),
  dispatch => ({
    resetPost: () => dispatch(resetPost()),
    setPostData: data => dispatch(setPostData(data)),
    validatePost: () => dispatch(validatePost()),
    showAuthPopup: () => dispatch(showAuthPopup()),
  }),
)(CreatePost);
