import { uniq, compact } from 'lodash';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import React from 'react';
import LayoutBase from '../components/Layout/LayoutBase';
import Footer from '../components/Footer';
import urls from '../utils/urls';
import Feed from '../components/Feed/FeedView';
import UserList from '../components/User/UserList';
import OrganizationList from '../components/Organization/OrganizationList';
import * as postsUtils from '../utils/posts';
import NotFoundPage from './NotFoundPage';
import { getPostById } from '../store/posts';
import * as feedActions from '../actions/feed';
import { FEED_PER_PAGE } from '../utils/feed';

const LIST_LIMIT = 5;

const Publications = (props) => {
  const page = +props.match.params.page || 1;
  const postsCategoryName = props.match.params.name;
  const postsCategory = postsUtils.POSTS_CATREGORIES.find(i => i.name === postsCategoryName);

  if (!postsCategory) {
    return <NotFoundPage />;
  }

  const posts = props.feed.postIds.map(id => getPostById(props.posts, id));
  const usersIds = compact(uniq(posts.map(i => i.userId)));
  const orgsIds = compact(uniq(posts.map(i => i.organizationId)));

  const onClickLoadMore = () => {
    props.dispatch(feedActions.feedGetPosts(postsCategory.id, {
      page: +props.feed.metadata.page + 1,
      perPage: FEED_PER_PAGE,
    }));
  };

  React.useEffect(() => {
    props.dispatch(feedActions.feedReset());
    props.dispatch(feedActions.feedGetPosts(postsCategory.id, {
      page,
      perPage: FEED_PER_PAGE,
    }));
  }, [postsCategoryName]);

  return (
    <LayoutBase>
      <div className="content-wrapper">
        <div className="content content_base">
          <div className="content__inner">
            <div className="nav-bar">
              <div className="nav-bar__title">
                <h1 className="title">Publications</h1>
              </div>

              <div className="nav-bar__menu">
                <div className="toolbar toolbar_responsive">
                  <div className="toolbar__main">
                    <div className="menu menu_simple-tabs">
                      {postsUtils.POSTS_CATREGORIES.map(item => (
                        <div className="menu__item" key={item.id}>
                          <NavLink
                            className="menu__link"
                            activeClassName="menu__link_active"
                            to={urls.getPublicationsCategoryUrl(item.name)}
                            isActive={() => props.location.pathname.indexOf(urls.getPublicationsCategoryUrl(item.name)) === 0}
                          >
                            {item.name}
                          </NavLink>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="content__separator" />

          <div className="content__inner">
            <div className="grid grid_publications">
              <div className="grid__item grid__item_main">
                <Feed
                  hasMore={props.feed.metadata.hasMore}
                  postIds={props.feed.postIds}
                  loading={props.feed.loading}
                  loadMoreUrl={urls.getPublicationsCategoryUrl(postsCategory.name, page + 1)}
                  onClickLoadMore={onClickLoadMore}
                />
              </div>

              <div className="grid__item grid__item_side">
                <div className="feed_side">
                  <div className="sidebar">
                    {!!usersIds.length &&
                      <div className="user-section">
                        <div className="user-section__title">
                          <h2 className="title title_xxsmall title_medium">
                            People {usersIds.length > LIST_LIMIT && <em>{usersIds.length}</em>}
                          </h2>
                        </div>
                        <UserList usersIds={usersIds} limit={LIST_LIMIT} />
                      </div>
                    }

                    {!!orgsIds.length &&
                      <div className="user-section">
                        <div className="user-section__title">
                          <h2 className="title title_xxsmall title_medium">
                            Organizations {orgsIds.length > LIST_LIMIT && <em>{orgsIds.length}</em>}
                          </h2>
                        </div>
                        <OrganizationList limit={LIST_LIMIT} organizationsIds={orgsIds} />
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="content__inner">
          <Footer />
        </div>
      </div>
    </LayoutBase>
  );
};

export const getPublicationsPageData = (store, { name, page = 1 }) => {
  const postsCategoryId = postsUtils.POSTS_CATREGORIES.find(i => i.name === name).id;

  return store.dispatch(feedActions.feedGetPosts(postsCategoryId, { page, perPage: FEED_PER_PAGE }));
};

export default connect(state => ({
  feed: state.feed,
  posts: state.posts,
}))(Publications);
