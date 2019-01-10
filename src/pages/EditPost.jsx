import { Redirect } from 'react-router';
import humps from 'lodash-humps';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import LayoutClean from '../components/Layout/LayoutClean';
import CreateBy from '../components/CreateBy';
import Button from '../components/Button';
import Medium from '../components/Medium';
import api from '../api';
import { selectUser } from '../store/selectors';
import { postSetSaved, setPostData, validatePost, resetPost, setDataToStoreToLS } from '../actions';
import { authShowPopup } from '../actions/auth';
import loader from '../utils/loader';
import urls from '../utils/urls';
import Close from '../components/Close';
import { parseMediumContent } from '../utils/posts';
import Popup from '../components/Popup';
import ModalContent from '../components/ModalContent';
import PostSubmitForm from '../components/Post/PostSubmitForm';

const EditPost = (props) => {
  const postId = props.match.params.id;
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [submitPopupVisible, setSubmitPopupVisible] = useState(false);

  const getPost = async () => {
    loader.start();
    setLoading(true);

    try {
      const data = await api.getPost(props.match.params.id);
      props.setPostData(data);
    } catch (e) {
      console.error(e);
    }

    loader.done();
    setLoaded(true);
    setLoading(false);
  };

  const savePost = async () => {
    if (!props.user.id) {
      props.authShowPopup();
      return;
    }

    if (!props.post.isValid) {
      props.validatePost();
      return;
    }

    const saveFn = postId ? api.updatePost.bind(api) : api.createPost.bind(api);
    loader.start();
    setLoading(true);

    try {
      const data = await saveFn(props.post.data, props.match.params.id);
      props.postSetSaved(true);
      props.setPostData({ id: data.id || data.postId });
    } catch (e) {
      console.error(e);
      setLoading(false);
    }

    loader.done();
  };

  useEffect(() => {
    props.resetPost();

    if (postId) {
      getPost(postId);
    } else if (localStorage.post_data) {
      const value = localStorage.getItem('post_data');
      props.setPostData(JSON.parse(value));
    }

    return () => {
      props.resetPost();
    };
  }, [postId]);

  if (props.post.data.id && props.post.saved) {
    localStorage.removeItem('post_data');
    return <Redirect to={urls.getPostUrl(humps(props.post.data))} />;
  }

  return (
    <LayoutClean>
      {submitPopupVisible &&
        <Popup onClickClose={() => setSubmitPopupVisible(false)}>
          <ModalContent onClickClose={() => setSubmitPopupVisible(false)} mod="post-submit">
            <PostSubmitForm />
          </ModalContent>
        </Popup>
      }

      <div className="edit-post">
        <div className="edit-post__container">
          <div className="edit-post__toolbar">
            <div className="edit-post-toolbar">
              <div className="edit-post-toolbar__title">
                <h1 className="title title_xxsmall title_medium">{`${postId ? 'Edit' : 'Create'} Media Post`}</h1>
              </div>
              <div className="edit-post-toolbar__user">
                <CreateBy />
              </div>
              <div className="edit-post-toolbar__action">
                <Button isStretched theme="red" size="small" text="Publish" onClick={() => setSubmitPopupVisible(true)} isDisabled={loading || !props.post.isValid} />
              </div>
              <div className="edit-post-toolbar__close">
                <Close />
              </div>
            </div>
          </div>
        </div>

        <div className="edit-post__content">
          <div className="edit-post__container">
            <div className="edit-post__form">
              {(!postId || loaded) &&
                <Medium
                  value={props.post.data.description}
                  onChange={(description) => {
                    props.setDataToStoreToLS(parseMediumContent(description));
                    props.validatePost();
                  }}
                  onUploadStart={() => {
                    setLoading(true);
                    loader.start();
                  }}
                  onUploadDone={() => {
                    setLoading(false);
                    loader.done();
                  }}
                />
              }
            </div>
          </div>
        </div>

        <div className="edit-post__container">
          <div className="edit-post__toolbar">
            <div className="edit-post-toolbar">
              <div className="edit-post-toolbar__user">
                <CreateBy />
              </div>
              <div className="edit-post-toolbar__action">
                <Button isStretched theme="red" size="small" text="Publish" onClick={() => setSubmitPopupVisible(true)} isDisabled={loading || !props.post.isValid} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutClean>
  );
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
    setDataToStoreToLS,
  }, dispatch),
)(EditPost);
