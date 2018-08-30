import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';
import { kebabCase } from 'lodash';
import { NavLink } from 'react-router-dom';
import React from 'react';
import Avatar from './Avatar';
import { getFileUrl } from '../utils/upload';
import PrefixInput from './PrefixInput';
import EyeIcon from './Icons/Eye';
import { getUserName } from '../utils/user';

const TAB_NAMES = [
  'Story',
  'Challenge',
  'Poll',
  'News',
  'Trading Forecast',
  'Review',
  'Analytics',
  'Interview',
];

const CreatePostHeader = props => (
  <div className="create-post__content">
    <div className="create-post__title">
      <h1 className="title">{props.title}</h1>
      <div className="create-post__title-button">
        <button
          className="button button_theme_red button_size_small button_stretched button_capitalized"
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

    <div className={cn('create-post__author', { 'create-post__author_preview': props.isPreview })}>
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
    {props.isPreview && (
      <div className="create-post__preview-text inline">
        <div className="inline__item">Preivew</div>
        <div className="inline__item"><EyeIcon /></div>
      </div>
    )}
    {props.isPreview && (
      <div className="create-post__field create-post__field_high">
        <div className="field">
          <div className="field__label">
            Name Media Post
          </div>
          <div className="field__input">
            <PrefixInput prefix="u.community/" subtext="Media Post id - id23784528" />
          </div>
        </div>
      </div>
    )}

    {!props.withoutTabs && (
      <div className="create-post__field">
        <div className="menu menu_simple-tabs menu_simple-tabs_black menu_simple-tabs_small">
          {(props.tabs || TAB_NAMES).map(tabName => (
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
    )}
  </div>
);

CreatePostHeader.propTypes = {
  onClickPost: PropTypes.func,
  title: PropTypes.string,
  withoutTabs: PropTypes.bool,
  isPreview: PropTypes.bool,
  tabs: PropTypes.arrayOf(PropTypes.string),
};

CreatePostHeader.defaultProps = {
  title: 'Create Media Post',
};

export default connect(state => ({
  user: state.user,
}), null)(CreatePostHeader);
