import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../components/Avatar';
import PostFormEditor from './PostFormEditor';
import OrganizationsDropdown from '../components/OrganizationsDropdown';
import Button from './Button';
import { getFileUrl } from '../utils/upload';
import { getUserName } from '../utils/user';
import { POST_TYPES } from '../utils/posts';
import { selectUser } from '../store/selectors';
import { setPostData } from '../actions';

class PostForm extends PureComponent {
  render() {
    const organization = this.props.user.organizations.find(i =>
      i.id === this.props.post.data.organization_id);

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
                  <div className="inline inline_small">
                    <div className="inline__item">
                      <span className="post-form__light">By</span>
                    </div>
                    <div className="inline__item">
                      <Avatar size="xsmall" src={getFileUrl(organization ? organization.avatarFilename : this.props.user.avatarFilename)} />
                    </div>
                    <div className="inline__item">
                      <div className="title title_xsmall title_light">{organization ? organization.title : getUserName(this.props.user)}</div>
                    </div>
                    <div className="inline__item">
                      <OrganizationsDropdown
                        onSelect={(organization_id) => {
                          this.props.setPostData({ organization_id });
                        }}
                      />
                    </div>
                  </div>
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

            <div className="post-form__footer">
              <div className="post-form__content">
                <div className="toolbar">
                  <div className="toolbar__main">
                    <a href="#top" className="create-post__back-link">Back to settings ↑</a>
                  </div>
                  <div className="toolbar__side">
                    <div className="inline">
                      <div className="inline__item">
                        <Avatar size="xsmall" src={getFileUrl(organization ? organization.avatarFilename : this.props.user.avatarFilename)} />
                      </div>
                      {this.props.user.id && (
                        <span className="inline__item">
                          <span className="create-post__author-name">{organization ? organization.title : getUserName(this.props.user)}</span>
                        </span>
                      )}
                      <span className="inline__item">
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
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
