import { kebabCase } from 'lodash';
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router';
import React, { Fragment, PureComponent } from 'react';
import StoryPage from './Posts/Story';
import Button from '../components/Button';
import PrefixInput from '../components/PrefixInput';
import Avatar from '../components/Avatar';

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

class CreatePost extends PureComponent {
  render() {
    return (
      <div className="create-post">
        <div className="create-post__header">
          <div className="create-post__title">
            <div className="inline inline_large">
              <div className="inline__item">
                <h1 className="title">Create Media Post</h1>
              </div>
              <div className="inline__item">
                <Button isStretched size="small" theme="red" text="Post" />
              </div>
            </div>
          </div>

          <div className="create-post__author">
            <div className="inline inline_small">
              <span className="inline__item">
                By
              </span>
              <span className="inline__item">
                <Avatar size="xsmall" src="https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg" />
              </span>
              <span className="inline__item">
                <span className="create-post__author-name">Kirill Romanov</span>
              </span>
            </div>
          </div>

          <div className="create-post__field">
            <div className="field">
              <div className="field__label">
                Name Media Post
              </div>
              <div className="field__input">
                <PrefixInput prefix="u.community/" />
              </div>
            </div>
          </div>

          <div className="create-post__navigation">
            <div className="menu menu_simple-tabs menu_simple-tabs_black menu_simple-tabs_small">
              {TAB_NAMES.map(tabName => (
                <div className="menu__item">
                  <NavLink
                    className="menu__link"
                    activeClassName="menu__link_active"
                    to={`/posts/new/${kebabCase(tabName)}`}
                    isActive={() => this.props.location.pathname === `/posts/new/${kebabCase(tabName)}`}
                  >
                    {tabName}
                  </NavLink>
                </div>
              ))}
            </div>
          </div>

          <Fragment>
            <Route exact path="/posts/new/story" component={StoryPage} />
          </Fragment>
        </div>
      </div>
    );
  }
}

export default CreatePost;
