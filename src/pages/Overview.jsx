import { NavLink, Switch, Route } from 'react-router-dom';
import React from 'react';
import LayoutBase from '../components/Layout/LayoutBase';
import Footer from '../components/Footer';
import urls from '../utils/urls';
import * as overviewUtils from '../utils/overview';
import Publications from '../components/Overview/Publications';
import Communities from '../components/Overview/Communities';
import Tags from '../components/Overview/TagsTab';
import Posts from '../components/Overview/PostsTab';
import NotFoundPage from './NotFoundPage';
import * as feedActions from '../actions/feed';
import { FEED_PER_PAGE } from '../utils/feed';


const Overview = (props) => {
  const overviewCategoryName = props.match.params.filter;
  const overviewRouteName = props.match.params.route;
  const overviewCategory = overviewUtils.OVERVIEW_CATEGORIES.find(i => i.name === overviewCategoryName);

  if (!overviewCategory || !overviewRouteName) {
    return <NotFoundPage />;
  }

  const overviewComponents = {
    publications: Publications,
    posts: Posts,
    communities: Communities,
    tags: Tags,
  };

  const overviewRoutes = overviewUtils.OVERVIEW_ROUTES.map(item => ({
    path: `/overview/${item.name}/filter/:filter`, component: overviewComponents[item.name],
  }));

  return (
    <LayoutBase>
      <div className="content-wrapper content_overview">
        <div className="content">
          <div className="content__inner content__inner_overview">
            <div className="nav-bar">
              <div className="nav-bar__title nav-bar__title_overview">
                <h1 className="title title_big title_bold">Overview</h1>
                <div className="nav-bar__categories">
                  {overviewUtils.OVERVIEW_CATEGORIES.map(item => (
                    <div className="menu__item" key={item.id}>
                      <NavLink
                        className="overview__link"
                        activeClassName="overview__link_active"
                        to={urls.getOverviewCategoryUrl({ filter: item.name, route: overviewRouteName })}
                        isActive={() => props.location.pathname.indexOf(`filter/${item.name}`) !== -1}
                      >
                        {item.name}
                      </NavLink>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
          <div className="content__inner content__inner_overview content__inner_overview_shadow">
            <div className="nav-bar__menu">
              <div className="toolbar toolbar_responsive">
                <div className="toolbar__main">
                  <div className="menu menu_simple-tabs">
                    {overviewUtils.OVERVIEW_ROUTES.map(item => (
                      <div className="menu__item" key={item.id}>
                        <NavLink
                          className="menu__link"
                          activeClassName="menu__link_active"
                          to={urls.getOverviewCategoryUrl({ route: item.name, filter: overviewCategoryName })}
                          isActive={() => props.location.pathname.indexOf(urls.getOverviewCategoryUrl({ route: item.name, filter: overviewCategoryName })) === 0}
                        >
                          {item.name}
                        </NavLink>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <hr className="content__separator content__separator_overview" />
            <Switch>
              {overviewRoutes.map(r => <Route path={r.path} component={r.component} key={r.path} />)}
            </Switch>
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

export const getPageData = (store, { name, page = 1 }) => {
  const overviewCategoryId = overviewUtils.OVERVIEW_CATEGORIES.find(i => i.name === name).id;

  return store.dispatch(feedActions.feedGetPosts(overviewCategoryId, { page, perPage: FEED_PER_PAGE }));
};

export default Overview;
