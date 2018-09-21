import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { PureComponent, Fragment } from 'react';
import classNames from 'classnames';
import PostFormEditor from './PostFormEditor';
import OfferFormEditor from './OfferFormEditor';
import EventTitle from './EventTitle';
import { getFileUrl } from '../utils/upload';
import { setPostData } from '../actions';

import user1Image from '../static/promo_team/1.png';
import user2Image from '../static/promo_team/2.jpeg';
import user3Image from '../static/promo_team/3.png';
import user4Image from '../static/promo_team/4.png';

import buyer1Image from '../static/promo_buyers/1.jpeg';
import buyer2Image from '../static/promo_buyers/2.jpeg';
import buyer3Image from '../static/promo_buyers/3.jpeg';

const TEAM = [{
  avatarUrl: user1Image,
  id: 1,
}, {
  avatarUrl: user2Image,
  id: 2,
}, {
  avatarUrl: user3Image,
  id: 3,
}, {
  avatarUrl: user4Image,
  id: 4,
}];

const BUYERS = [{
  avatarUrl: buyer1Image,
  id: 1,
}, {
  avatarUrl: buyer2Image,
  id: 2,
}, {
  avatarUrl: buyer3Image,
  id: 3,
}];

const TABS = [{
  id: 1,
  title: 'Media-posts',
}, {
  id: 2,
  title: 'Offers',
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
          Value — your relevance, relations, measured by the community and registered on the blockchain. Your value equals coin emission that you recieve.
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
          Ideas, Knowledge sharing and opinions fuel the world. Share your stories, polls, forecasts,  and get immediate response.
        </div>

        {this.state.activeTabId === 1 ? (
          <div className="promo-editor__editor">
            <PostFormEditor />
          </div>
        ) : (
          <Fragment>
            <div className="promo-editor__event-title">
              <EventTitle
                black
                editableTitle
                editableCover
                rate={9200}
                tags={['sale']}
                title={this.props.post.data.title}
                actionButtonTitle={this.props.post.data.action_button_title || 'Buy now'}
                actionButtonUrl={this.props.post.data.action_button_url}
                actionDurationInDays={this.props.post.data.action_duration_in_days || 1}
                createdAt={(new Date()).getTime() - 10000}
                imgSrc={this.state.base64Cover || getFileUrl(this.props.post.data.main_image_filename)}
                team={TEAM}
                teamTitle="Invite your Partners"
                buyers={BUYERS}
                buyersCount={8923}
                buyersTitle="See your Buyers"
                timerTitle="Set countdown"
              />
            </div>
            <div className="promo-editor__editor promo-editor__editor_offer">
              <OfferFormEditor />
            </div>
          </Fragment>
        )}

        <div className="promo-editor__action">
          <Link className="button button_upper button_theme_red button_size_big button_stretched" to="/signup">Publish</Link>
        </div>
      </div>
    );
  }
}

PromoEditor.propTypes = {
  post: PropTypes.objectOf(PropTypes.any),
};

export default connect(
  state => ({
    post: state.post,
  }),
  dispatch => ({
    setPostData: data => dispatch(setPostData(data)),
  }),
)(PromoEditor);
