import objectToFormData from 'object-to-formdata';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import React, { PureComponent } from 'react';
import PostForm from '../components/PostForm';
import OfferForm from '../components/OfferForm';
import { setPostData, validatePost, resetPost } from '../actions';
import { createPost, updatePost, getPost } from '../api';
import { getPostUrl } from '../utils/posts';
import { getToken } from '../utils/token';

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

    getPost(id).then((data) => {
      this.props.setPostData(data);
    });
  }

  save() {
    if (!this.props.post.isValid) {
      this.props.validatePost();
      return;
    }

    const saveFn = this.props.match.params.id ? updatePost : createPost;
    const data = objectToFormData(this.props.post.data, {
      indices: true,
    });

    this.setState({ loading: true }, () => {
      saveFn(data, getToken(), this.props.match.params.id)
        .then((data) => {
          this.setState({ loading: false });
          this.props.history.push(getPostUrl(data.id || data.post_id));
        });
    });
  }

  render() {
    if (!this.props.user.id) {
      return <Redirect to="/" />;
    }

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
  post: PropTypes.objectOf(PropTypes.any),
};

export default connect(
  state => ({
    user: state.user,
    post: state.post,
  }),
  dispatch => ({
    resetPost: () => dispatch(resetPost()),
    setPostData: data => dispatch(setPostData(data)),
    validatePost: () => dispatch(validatePost()),
  }),
)(CreatePost);
