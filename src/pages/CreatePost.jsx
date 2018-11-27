import { Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import PostForm from '../components/PostForm';
// import OfferForm from '../components/OfferForm';
import LayoutBase from '../components/Layout/LayoutBase';
import { postSetSaved, setPostData, validatePost, resetPost } from '../actions';
import { authShowPopup } from '../actions/auth';
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
      this.props.authShowPopup();
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
          this.props.postSetSaved(true);
          this.props.setPostData({ id: data.postId });
        });
    });
  }

  render() {
    if (this.props.post.data.id && this.props.post.saved) {
      return <Redirect to={getPostUrl(this.props.post.data.id)} />;
    }

    switch (this.props.post.data.post_type_id) {
      // case 2:
      //   return (
      //     <OfferForm
      //       onClickSave={() => this.save()}
      //       loading={this.state.loading}
      //     />
      //   );
      default:
        return (
          <LayoutBase>
            <PostForm
              onClickSave={() => this.save()}
              loading={this.state.loading}
            />
          </LayoutBase>
        );
    }
  }
}

CreatePost.propTypes = {
  resetPost: PropTypes.func,
  setPostData: PropTypes.func,
  validatePost: PropTypes.func,
  authShowPopup: PropTypes.func,
  post: PropTypes.objectOf(PropTypes.any),
};

export default connect(
  state => ({
    user: selectUser(state),
    post: state.post,
  }),
  dispatch => bindActionCreators({
    resetPost,
    setPostData,
    validatePost,
    authShowPopup,
    postSetSaved,
  }, dispatch),
)(CreatePost);
