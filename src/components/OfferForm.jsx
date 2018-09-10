import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../components/Avatar';
import DropZone from '../components/DropZone';
import EventTitle from '../components/EventTitle';
import Medium from '../components/Medium';
import TextInput from '../components/TextInput';
import Switcher from '../components/Switcher';
import InputErrorIcon from '../components/Icons/InputError';
import UserSearchInput from './UserSearchInput';
import { setPostData, validatePostField } from '../actions';
import { getFileUrl, getBase64FromFile } from '../utils/upload';
import { getUserName } from '../utils/user';
import { OFFER_TYPES } from '../utils/offer';

class OfferForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      base64Cover: null,
    };
  }

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
                      <h1 className="title">{this.props.post.data.id ? 'Edit' : 'Create'} Offer</h1>
                    </div>
                    <div className="toolbar__side">
                      <button
                        className="button button_theme_red button_size_small button_stretched button_capitalized"
                        onClick={() => {
                          if (typeof this.props.onClickSave === 'function') {
                            this.props.onClickSave();
                          }
                        }}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>

                <div className="inline inline_small">
                  <div className="inline__item">
                    <span className="post-form__light">By</span>
                  </div>
                  <div className="inline__item">
                    <Avatar size="xsmall" src={getFileUrl(this.props.user.avatar_filename)} />
                  </div>
                  <div className="inline__item">
                    <div className="title title_xsmall title_light">{getUserName(this.props.user)}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="post-form__content post-form__content_wide">
              <div className="post-form__item">
                <div className="menu menu_inline menu_simple-tabs menu_simple-tabs_small">
                  {OFFER_TYPES.map((item, index) => (
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

            <div className="post-form__content">
              <div className="post-form__item">
                <div className="field">
                  <div className="field__label">
                    Offer Title
                  </div>
                  <div className="field__input">
                    <TextInput
                      placeholder="Type something..."
                      value={this.props.post.data.title}
                      error={this.props.post.errors.title && this.props.post.errors.title[0]}
                      onChange={(title) => {
                        this.props.setPostData({ title });
                        this.props.validatePostField('title');
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="post-form__item">
                <div className="field">
                  <div className="field__label">
                    Action Button
                  </div>
                  <div className="field__input">
                    <div className="field__item">
                      <TextInput
                        placeholder="Name of Acton Button"
                        value={this.props.post.data.action_button_title}
                        error={this.props.post.errors.action_button_title && this.props.post.errors.action_button_title[0]}
                        onChange={(action_button_title) => {
                          this.props.setPostData({ action_button_title });
                          this.props.validatePostField('action_button_title');
                        }}
                      />
                    </div>
                    <div className="field__item">
                      <TextInput
                        placeholder="Link"
                        value={this.props.post.data.action_button_url}
                        error={this.props.post.errors.action_button_url && this.props.post.errors.action_button_url[0]}
                        onChange={(action_button_url) => {
                          this.props.setPostData({ action_button_url });
                          this.props.validatePostField('action_button_url');
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="post-form__item">
                <div className="field">
                  <div className="field__label">
                    Time Sale
                  </div>
                  <div className="field__input">
                    <div className="field__item">
                      <TextInput
                        placeholder="Days"
                        inputWidth={150}
                        value={this.props.post.data.action_duration_in_days.toString()}
                        error={this.props.post.errors.action_duration_in_days && this.props.post.errors.action_duration_in_days[0]}
                        onChange={(action_duration_in_days) => {
                          this.props.setPostData({ action_duration_in_days });
                          this.props.validatePostField('action_duration_in_days');
                        }}
                      />
                    </div>
                    <div className="field__item">
                      <Switcher
                        textColor="gray"
                        labels={['Unlimited', '']}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="post-form__item">
                <div className="field">
                  <div className="field__label">
                    Add Team
                  </div>
                  <div className="field__input">
                    <UserSearchInput
                      isMulti
                      isSearchable
                      isClearable
                      isUserOptions
                      value={this.props.post.data.post_users_team}
                      onChange={(post_users_team) => {
                        this.props.setPostData({ post_users_team });
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="post-form__item">
                <div className="field">
                  <div className="field__label">
                    Offer&apos;s cover
                  </div>
                  <div className="field__input">
                    <div className="field__item">
                      <DropZone
                        text="add or drag img"
                        accept="image/jpeg, image/png"
                        onDrop={(files) => {
                          getBase64FromFile(files[0]).then((base64Cover) => {
                            this.props.setPostData({ main_image_filename: files[0] });
                            this.props.validatePostField('main_image_filename');
                            this.setState({ base64Cover });
                          });
                        }}
                      />

                      {this.props.post.errors.main_image_filename && this.props.post.errors.main_image_filename.length > 0 ? (
                        <div className="field__error">
                          <InputErrorIcon /> {this.props.post.errors.main_image_filename}
                        </div>
                      ) : null}
                    </div>
                    <div className="field__item">
                      You can upload an image in JPG or PNG format.
                      Size is not more than 10mb.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <EventTitle
              className="event-title_big"
              tags={['sale']}
              title={this.props.post.data.title}
              actionButtonTitle={this.props.post.data.action_button_title}
              actionButtonUrl={this.props.post.data.action_button_url}
              actionDurationInDays={this.props.post.data.action_duration_in_days}
              imgSrc={this.state.base64Cover || getFileUrl(this.props.post.data.main_image_filename)}
              team={this.props.post.data.post_users_team}
            />

            <div className="post-form__item">
              <div
                className={classNames(
                  'post-form__editor',
                  { 'post-form__editor_offer': this.state.base64Cover || this.props.post.data.main_image_filename },
                )}
              >
                <div className="post-form__content post-form__content_wide">
                  <div className="editor">
                    <div className="editor__item">
                      <input
                        type="text"
                        placeholder="Lead text"
                        className="editor__input editor__input_medium"
                        value={this.props.post.data.leading_text}
                        onChange={(e) => {
                          this.props.setPostData({ leading_text: e.target.value });
                          this.props.validatePostField('leading_text');
                        }}
                      />
                      {this.props.post.errors.leading_text && this.props.post.errors.leading_text.length > 0 ? (
                        <div className="editor__error">{this.props.post.errors.leading_text[0]}</div>
                      ) : null}
                    </div>

                    <div className="editor__item">
                      <div className="editor__body">
                        <Medium
                          value={this.props.post.data.description}
                          onChange={(description) => {
                            this.props.setPostData({ description });
                            this.props.validatePostField('description');
                          }}
                        />
                      </div>

                      {this.props.post.errors.description && this.props.post.errors.description.length > 0 ? (
                        <div className="editor__error">{this.props.post.errors.description[0]}</div>
                      ) : null}
                    </div>
                  </div>
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
                        <Avatar size="xsmall" src={getFileUrl(this.props.user.avatar_filename)} />
                      </div>
                      <span className="inline__item">
                        <span className="create-post__author-name">{getUserName(this.props.user)}</span>
                      </span>
                      <span className="inline__item">
                        <button
                          className="button button_theme_red button_size_small button_stretched button_capitalized"
                          onClick={() => {
                            if (typeof this.props.onClickSave === 'function') {
                              this.props.onClickSave();
                            }
                          }}
                        >
                          Post
                        </button>
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

OfferForm.propTypes = {
  post: PropTypes.objectOf(PropTypes.any),
  onClickSave: PropTypes.func,
  setPostData: PropTypes.func,
  validatePostField: PropTypes.func,
};

export default connect(
  state => ({
    user: state.user,
    post: state.post,
  }),
  dispatch => ({
    setPostData: data => dispatch(setPostData(data)),
    validatePostField: data => dispatch(validatePostField(data)),
  }),
)(OfferForm);
