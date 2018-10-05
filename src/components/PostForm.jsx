import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PostFormEditor from './PostFormEditor';
import Button from './Button';
import CreateBy from './CreateBy';
import PostFromFooter from './PostFromFooter';
import { POST_TYPES } from '../utils/posts';
import { selectUser } from '../store/selectors';
import { setPostData } from '../actions';

class PostForm extends PureComponent {
  render() {
    return (
      <div className="content">
        <div className="content__inner">
          <div className="post-form">
            <div className="post-form__content">
              <div className="post-form__item">
                <div className="post-form__title">
                  <div className="toolbar">
                    <div className="toolbar__main">
                      <h1 className="title">{this.props.post.data.id ? 'Edit' : 'Create'} Post</h1>
                    </div>
                    <div className="toolbar__side">
                      <Button
                        isStretched
                        isUpper
                        theme="red"
                        size="small"
                        text="Post"
                        isDisabled={this.props.loading}
                        onClick={() => {
                          if (typeof this.props.onClickSave === 'function') {
                            this.props.onClickSave();
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                {this.props.user.id && (
                  <CreateBy />
                )}
              </div>
            </div>

            <div className="post-form__content post-form__content_wide">
              <div className="post-form__item">
                <div className="menu menu_inline menu_simple-tabs menu_simple-tabs_small">
                  {POST_TYPES.map((item, index) => (
                    <div className="menu__item" key={item.id}>
                      <div
                        className={classNames(
                          'menu__link',
                          { 'menu__link_active': index === 0 },
                        )}
                      >
                        {item.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="post-form__item">
              <div className="post-form__editor">
                <div className="post-form__content post-form__content_wide">
                  <PostFormEditor />
                </div>
              </div>
            </div>

            <PostFromFooter
              loading={this.props.loading}
              onClickSave={() => {
                if (typeof this.props.onClickSave === 'function') {
                  this.props.onClickSave();
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  post: PropTypes.objectOf(PropTypes.any),
  onClickSave: PropTypes.func,
  loading: PropTypes.bool,
};

export default connect(
  state => ({
    user: selectUser(state),
    post: state.post,
  }),
  dispatch => ({
    setPostData: data => dispatch(setPostData(data)),
  }),
)(PostForm);
