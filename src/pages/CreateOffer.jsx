import { Redirect } from 'react-router';
import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import Avatar from '../components/Avatar';
import TextInput from '../components/TextInput';
import Switcher from '../components/Switcher';
import DropZone from '../components/DropZone';
import OfferTitle from '../components/OfferTitle';
import Medium from '../components/Medium';
import InputErrorIcon from '../components/Icons/InputError';
import { getFileUrl } from '../utils/upload';
import { getUserName } from '../utils/user';
import { OFFER_TYPES, validateSaleOffer, getOfferUrl } from '../utils/offer';
import { getError } from '../utils/errors';
import { getToken } from '../utils/token';
import { createOffer, getPost, updateOffer } from '../api';

class SalePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: null,
      post_type_id: OFFER_TYPES[0].id,
      action_button_title: null,
      action_button_url: null,
      action_duration_in_days: null,
      time_sale_unlimited: null,
      team_ids: [],
      main_image_filename: null,
      leading_text: null,
      description: null,
      errors: null,
      coverDataUrl: null,
      loaded: this.props.match.params.id === undefined,
      saved: false,
      id: null,
    };
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.getData();
    }
  }

  getData() {
    getPost(this.props.match.params.id)
      .then((data) => {
        this.setState({
          title: data.title,
          action_button_title: data.action_button_title,
          action_button_url: data.action_button_url,
          action_duration_in_days: data.action_duration_in_days,
          time_sale_unlimited: data.time_sale_unlimited,
          main_image_filename: data.main_image_filename,
          leading_text: data.leading_text,
          description: data.description,
          loaded: true,
        });
      });
  }

  save() {
    const errors = validateSaleOffer(this.state);

    this.setState({ errors });

    if (errors.length) {
      return;
    }

    const token = getToken();
    const data = new FormData();

    [
      'title',
      'description',
      // 'post_type_id',
      'action_button_title',
      'action_button_url',
      'action_duration_in_days',
      // 'time_sale_unlimited',
      'main_image_filename',
      'leading_text',
    ].forEach((item) => {
      data.append(item, this.state[item]);
    });

    (
      this.props.match.params.id ?
        updateOffer(this.props.match.params.id, data, token) :
        createOffer(data, token)
    )
      .then((data) => {
        if (data.errors) {
          this.setState({ errors });
          return;
        }

        this.setState({
          saved: true,
          id: data.post_id,
        });
      });
  }

  converCover(file) {
    const reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        coverDataUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    if (!this.props.user.id) {
      return <Redirect to="/" />;
    }

    if (this.state.saved && this.state.id) {
      return <Redirect to={getOfferUrl(this.state.id)} />;
    }

    if (!this.state.loaded) {
      return null;
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
                  {OFFER_TYPES.map(item => (
                    <div className="menu__item" key={item.id}>
                      <div
                        className={classNames(
                          'menu__link',
                          { 'menu__link_active': this.state.post_type_id === item.id },
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
                      value={this.state.title}
                      error={getError(this.state.errors, 'title')}
                      onChange={title => this.setState({ title })}
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
                        value={this.state.action_button_title}
                        error={getError(this.state.errors, 'action_button_title')}
                        onChange={action_button_title => this.setState({ action_button_title })}
                      />
                    </div>
                    <div className="field__item">
                      <TextInput
                        placeholder="Link"
                        value={this.state.action_button_url}
                        error={getError(this.state.errors, 'action_button_url')}
                        onChange={action_button_url => this.setState({ action_button_url })}
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
                        value={this.state.action_duration_in_days}
                        error={getError(this.state.errors, 'action_duration_in_days')}
                        onChange={action_duration_in_days => this.setState({ action_duration_in_days })}
                      />
                    </div>
                    <div className="field__item">
                      <Switcher
                        textColor="gray"
                        labels={['Unlimited', '']}
                        isChecked={this.state.time_sale_unlimited}
                        onChange={time_sale_unlimited => this.setState({ time_sale_unlimited })}
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
                        error={getError(this.state.errors, 'main_image_filename')}
                        onDrop={(files) => {
                          this.setState({ main_image_filename: files[0] });
                          this.converCover(files[0]);
                        }}
                      />
                      {getError(this.state.errors, 'main_image_filename') && (
                        <div className="field__error">
                          <InputErrorIcon /> {getError(this.state.errors, 'main_image_filename')}
                        </div>
                      )}
                    </div>
                    <div className="field__item">
                      You can upload an image in JPG or PNG format.
                      Size is not more than 10mb.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {(this.state.coverDataUrl || getFileUrl(this.state.main_image_filename)) && (
              <OfferTitle
                tags={['sale']}
                title={this.state.title}
                actionButtonTitle={this.state.action_button_title}
                actionButtonUrl={this.state.action_button_url}
                actionDurationInDays={this.state.action_duration_in_days}
                imgSrc={this.state.coverDataUrl || getFileUrl(this.state.main_image_filename)}
              />
            )}

            <div className="post-form__item">
              <div
                className={classNames(
                  'post-form__editor',
                  { 'post-form__editor_offer': this.state.coverDataUrl || this.state.main_image_filename },
                )}
              >
                <div className="post-form__content post-form__content_wide">
                  <div className="editor">
                    <div className="editor__item">
                      <input
                        type="text"
                        placeholder="Lead text"
                        className="editor__input editor__input_medium"
                        value={this.state.leading_text}
                        onChange={e => this.setState({ leading_text: e.target.value })}
                      />
                      {getError(this.state.errors, 'leading_text') && (
                        <div className="editor__error">{getError(this.state.errors, 'leading_text')}</div>
                      )}
                    </div>

                    <div className="editor__item">
                      <div className="editor__body">
                        <Medium
                          value={this.state.description}
                          onChange={description => this.setState({ description })}
                        />
                      </div>
                      {getError(this.state.errors, 'description') && (
                        <div className="editor__error">{getError(this.state.errors, 'description')}</div>
                      )}
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

export default connect(state => ({
  user: state.user,
}), null)(SalePage);
