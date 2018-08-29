import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { kebabCase } from 'lodash';
import { NavLink } from 'react-router-dom';
import React from 'react';
import Avatar from './Avatar';
// import PrefixInput from './PrefixInput';
import { getUserName } from '../utils/user';
import { getFileUrl } from '../utils/upload';

const TAB_NAMES = [
  'Story',
  'Challenge',
  'Poll',
  'News',
  'Trading Forecast',
  'Review',
  'Analitics',
  'Interview',
];

const CreatePostHeader = props => (
  <div className="create-post__content">
    <div className="create-post__title">
      <div className="inline inline_large">
        <div className="inline__item">
          <h1 className="title">{props.title}</h1>
        </div>
        <div className="inline__item">
          <button
            className="button button_theme_red button_size_small button_stretched"
            onClick={() => {
              if (typeof props.onClickPost === 'function') {
                props.onClickPost();
              }
            }}
          >
            Post
          </button>
        </div>
      </div>
    </div>

    <div className="create-post__author">
      <div className="inline inline_small">
        <span className="inline__item">
          By
        </span>
        <span className="inline__item">
          <Avatar size="xsmall" src={getFileUrl(props.user.avatar_filename)} />
        </span>
        <span className="inline__item">
          <span className="create-post__author-name">{getUserName(props.user)}</span>
        </span>
      </div>
    </div>

    {/* <div className="create-post__field">
      <div className="field">
        <div className="field__label">
          Name Media Post
        </div>
        <div className="field__input">
          <PrefixInput prefix="u.community/" />
        </div>
      </div>
    </div> */}

    <div className="create-post__field">
      <div className="menu menu_simple-tabs menu_simple-tabs_black menu_simple-tabs_small">
        {TAB_NAMES.map(tabName => (
          <div className="menu__item" key={tabName}>
            <NavLink
              className="menu__link"
              activeClassName="menu__link_active"
              to={`/posts/new/${kebabCase(tabName)}`}
              isActive={() => props.location.pathname === `/posts/new/${kebabCase(tabName)}`}
            >
              {tabName}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  </div>
);

CreatePostHeader.propTypes = {
  onClickPost: PropTypes.func,
  title: PropTypes.string,
};

CreatePostHeader.defaultProps = {
  title: 'Create Media Post',
};

export default connect(state => ({
  user: state.user,
}), null)(CreatePostHeader);
