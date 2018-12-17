import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { setPostData } from '../actions';
import Medium from './Medium';

const TABS = [{
  id: 1,
  title: 'Media-posts',
}];

class PromoEditor extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeTabId: TABS[0].id,
    };
  }

  render() {
    return (
      <div className="promo-editor">
        <div className="promo-editor__title">
          <h1 className="title">Ur ideas and offers valued</h1>
        </div>
        <div className="promo-editor__text">
          Value — your relevance, relations, measured by the community and registered on the blockchain. Your value equals the token emission that you receive.
        </div>
        <div className="promo-editor__tabs">
          <div className="promo-tabs">
            {TABS.map(item => (
              <div
                key={item.id}
                role="presentation"
                onClick={() => this.setState({ activeTabId: item.id })}
                className={classNames(
                  'promo-tabs__item',
                  { 'promo-tabs__item_active': item.id === this.state.activeTabId },
                )}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
        <div className="promo-editor__sub-text">
          Ideas, knowledge-sharing and opinions fuel the world. Share your stories, polls, forecasts, and get immediate response.
        </div>

        <div className="promo-editor__editor">
          <Medium />
        </div>

        <div className="promo-editor__action">
          <Link className="button button_upper button_theme_red button_size_big button_stretched" to="/registration">Publish</Link>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    post: state.post,
  }),
  dispatch => ({
    setPostData: data => dispatch(setPostData(data)),
  }),
)(PromoEditor);
