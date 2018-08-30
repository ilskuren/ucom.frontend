import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import Avatar from '../../components/Avatar';
import TextInput from '../../components/TextInput';
import { getFileUrl } from '../../utils/upload';
import { getUserName } from '../../utils/user';
import { OFFER_TYPES } from '../../utils/offer';

class SalePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      offer: {
        title: null,
        type_id: OFFER_TYPES[0].id,
        action_button_name: null,
        action_button_link: null,
        time_sale_days: null,
        time_sale_unlimited: null,
        team_id: [],
        cover: null,
        lead_text: null,
        text: null,
      },
    };
  }

  render() {
    return (
      <div className="post-form">
        <div className="post-form__item">
          <div className="toolbar">
            <div className="toolbar__main">
              <h1 className="title">Create Offer</h1>
            </div>
            <div className="toolbar__side">
              <button className="button button_theme_red button_size_small button_stretched button_capitalized">Post</button>
            </div>
          </div>
        </div>

        <div className="post-form__item">
          <div className="inline inline_small">
            <div className="inline__item">
              By
            </div>
            <div className="inline__item">
              <Avatar size="xsmall" src={getFileUrl(this.props.user.avatar_filename)} />
            </div>
            <div className="inline__item">
              <div className="title title_xsmall title_light">{getUserName(this.props.user)}</div>
            </div>
          </div>
        </div>

        <div className="post-form__item">
          <div className="menu menu_simple-tabs menu_simple-tabs_black menu_simple-tabs_small">
            {OFFER_TYPES.map(item => (
              <div className="menu__item" key={item.id}>
                <div
                  className={classNames(
                    'menu__link',
                    { 'menu__link_active': this.state.offer.type_id === item.id },
                  )}
                >
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="post-form__item">
          <div className="field">
            <div className="field__label">
              Offer Title
            </div>
            <div className="field__input">
              <TextInput placeholder="Type something..." />
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
