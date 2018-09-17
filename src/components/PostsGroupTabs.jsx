import classNames from 'classnames';
import React, { PureComponent, Fragment } from 'react';
import PostsGroup from './PostsGroup';

const POSTS_TYPES = [{
  id: 1,
  name: 'Community Media',
  enabled: true,
}, {
  id: 3,
  name: 'Editorial Media',
  enabled: false,
}, {
  id: 4,
  name: 'Organizations Offers',
  enabled: false,
}, {
  id: 2,
  name: 'People Offers',
  enabled: true,
}];

class PostsGroupTabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activePostTypeId: POSTS_TYPES[0].id,
    };
  }

  changePostType(activePostTypeId) {
    this.setState({ activePostTypeId });
  }

  render() {
    return (
      <Fragment>
        <div className="page-nav">
          <div className="menu menu_media menu_responsive">
            {POSTS_TYPES.map(item => (
              <div className="menu__item" key={item.id}>
                <div
                  className={classNames(
                    'menu__link',
                    { 'menu__link_disabled': !item.enabled },
                    { 'menu__link_active': this.state.activePostTypeId === item.id },
                  )}
                  role="presentation"
                  onClick={() => this.changePostType(item.id)}
                >
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        <PostsGroup postTypeId={this.state.activePostTypeId} />
      </Fragment>
    );
  }
}

export default PostsGroupTabs;
