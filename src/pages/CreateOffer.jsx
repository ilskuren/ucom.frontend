import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import Avatar from '../components/Avatar';
import TextInput from '../components/TextInput';
import Switcher from '../components/Switcher';
import DropZone from '../components/DropZone';
import EventTitle from '../components/EventTitle';
import Medium from '../components/Medium';
import InputErrorIcon from '../components/Icons/InputError';
import { getFileUrl, getBase64FromFile } from '../utils/upload';
import { getUserName } from '../utils/user';
import { OFFER_TYPES } from '../utils/offer';
import { getPostUrl } from '../utils/posts';
import { getToken } from '../utils/token';
import { getFromDataFromObject } from '../utils/data';
import { createOffer, getPost, updateOffer } from '../api';
import { setOfferData, validateOfferField, validateOffer, resetOffer } from '../actions';

class SalePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      base64Cover: null,
    };
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.getData(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.match.params.id && nextProp.match.params.id !== this.props.match.params.id) {
      this.getData(nextProp.match.params.id);
    }

    if (this.props.match.params.id && !nextProp.match.params.id) {
      this.props.resetOffer();
    }
  }

  componentWillUnmount() {
    this.props.resetOffer();
  }

  getData(id) {
    this.props.resetOffer();

    getPost(id).then((data) => {
      this.props.setOfferData(data);
    });
  }

  save() {
    if (!this.props.offer.isValid) {
      this.props.validateOffer();
      return;
    }

    const saveFn = this.props.match.params.id ? updateOffer : createOffer;
    const data = getFromDataFromObject(this.props.offer.data);

    saveFn(data, getToken(), this.props.match.params.id)
      .then((data) => {
        this.props.history.push(getPostUrl(data.post_id));
      });
  }

  render() {
    if (!this.props.user.id) {
      return <Redirect to="/" />;
    }

    return (
      <div className="content">
        <div className="content__inner">
          <div className="post-form">
            <div className="post-form__content">
              <div className="post-form__item">
                <div className="post-form__title">
                  <div className="toolbar">
                    <div className="toolbar__main">
                      <h1 className="title">Create Offer</h1>
                    </div>
                    <div className="toolbar__side">
                      <button
                        className="button button_theme_red button_size_small button_stretched button_capitalized"
                        onClick={() => this.save()}
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
                      value={this.props.offer.data.title}
                      error={this.props.offer.errors.title && this.props.offer.errors.title[0]}
                      onChange={(title) => {
                        this.props.setOfferData({ title });
                        this.props.validateOfferField('title');
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
                        value={this.props.offer.data.action_button_title}
                        error={this.props.offer.errors.action_button_title && this.props.offer.errors.action_button_title[0]}
                        onChange={(action_button_title) => {
                          this.props.setOfferData({ action_button_title });
                          this.props.validateOfferField('action_button_title');
                        }}
                      />
                    </div>
                    <div className="field__item">
                      <TextInput
                        placeholder="Link"
                        value={this.props.offer.data.action_button_url}
                        error={this.props.offer.errors.action_button_url && this.props.offer.errors.action_button_url[0]}
                        onChange={(action_button_url) => {
                          this.props.setOfferData({ action_button_url });
                          this.props.validateOfferField('action_button_url');
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
                        value={this.props.offer.data.action_duration_in_days.toString()}
                        error={this.props.offer.errors.action_duration_in_days && this.props.offer.errors.action_duration_in_days[0]}
                        onChange={(action_duration_in_days) => {
                          this.props.setOfferData({ action_duration_in_days });
                          this.props.validateOfferField('action_duration_in_days');
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
                    <TextInput disabled placeholder="Find People" />
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
                            this.props.setOfferData({ main_image_filename: files[0] });
                            this.props.validateOfferField('main_image_filename');
                            this.setState({ base64Cover });
                          });
                        }}
                      />

                      {this.props.offer.errors.main_image_filename && this.props.offer.errors.main_image_filename.length > 0 ? (
                        <div className="field__error">
                          <InputErrorIcon /> {this.props.offer.errors.main_image_filename}
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

            {(this.state.base64Cover || this.props.offer.data.main_image_filename) && (
              <EventTitle
                tags={['sale']}
                title={this.props.offer.data.title}
                actionButtonTitle={this.props.offer.data.action_button_title}
                actionButtonUrl={this.props.offer.data.action_button_url}
                actionDurationInDays={this.props.offer.data.action_duration_in_days}
                imgSrc={this.state.base64Cover || getFileUrl(this.props.offer.data.main_image_filename)}
              />
            )}

            <div className="post-form__item">
              <div
                className={classNames(
                  'post-form__editor',
                  { 'post-form__editor_offer': this.state.base64Cover || this.props.offer.data.main_image_filename },
                )}
              >
                <div className="post-form__content post-form__content_wide">
                  <div className="editor">
                    <div className="editor__item">
                      <input
                        type="text"
                        placeholder="Lead text"
                        className="editor__input editor__input_medium"
                        value={this.props.offer.data.leading_text}
                        onChange={(e) => {
                          this.props.setOfferData({ leading_text: e.target.value });
                          this.props.validateOfferField('leading_text');
                        }}
                      />
                      {this.props.offer.errors.leading_text && this.props.offer.errors.leading_text.length > 0 ? (
                        <div className="editor__error">{this.props.offer.errors.leading_text[0]}</div>
                      ) : null}
                    </div>

                    <div className="editor__item">
                      <div className="editor__body">
                        <Medium
                          value={this.props.offer.data.description}
                          onChange={(description) => {
                            this.props.setOfferData({ description });
                            this.props.validateOfferField('description');
                          }}
                        />
                      </div>

                      {this.props.offer.errors.description && this.props.offer.errors.description.length > 0 ? (
                        <div className="editor__error">{this.props.offer.errors.description[0]}</div>
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
                          onClick={() => this.save()}
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

SalePage.propTypes = {
  resetOffer: PropTypes.func,
  setOfferData: PropTypes.func,
  validateOfferField: PropTypes.func,
  validateOffer: PropTypes.func,
  offer: PropTypes.objectOf(PropTypes.any),
};

export default connect(
  state => ({
    user: state.user,
    offer: state.offer,
  }),
  dispatch => ({
    resetOffer: () => dispatch(resetOffer()),
    setOfferData: data => dispatch(setOfferData(data)),
    validateOfferField: data => dispatch(validateOfferField(data)),
    validateOffer: () => dispatch(validateOffer()),
  }),
)(SalePage);
