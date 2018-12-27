import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import Rate from '../Rate';

const TagHead = props => (
  <div className="tag-header">
    <div className="tag-header__content tag-header__content_main">
      <div className="tag-header__section tag-header__section_account">
        <div className="tag-header__name">
          <h2 className="title title_medium">#{props.title}</h2>
        </div>
      </div>
      <div className="tag-header__section tag-header__section_rate">
        <Rate className="rate_big" value={props.currentRate} />
      </div>
    </div>

    <div className="tag-header__content">
      <div className="tag-header__section">
        <div className="tag-header__follow-button" />
      </div>

      <div className="tag-header__section">
        <div className="inline inline_large">
          <div className="inline__item">
            <div className="follwers">
              <div className="follwers__main">
                <div className="follwers__count">
                  <button
                    className="button-clean"
                  >
                    {props.postsAmount}
                  </button>
                </div>

                <div className="follwers__title">
                  <button
                    className="button-clean"
                  >
                    POSTS
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="inline__item">
            <div className="follwers">
              <div className="follwers__main">
                <div className="follwers__count">
                  <button
                    className="button-clean"
                  >
                    {props.usersAmount}
                  </button>
                </div>

                <div className="follwers__title">
                  <button
                    className="button-clean"
                  >
                    USES
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

TagHead.propTypes = {
  title: PropTypes.string,
  currentRate: PropTypes.number,
  postsAmount: PropTypes.number,
  usersAmount: PropTypes.number,
};

export default connect(state => ({
  users: state.users,
}))(TagHead);
