import { NavLink } from 'react-router-dom';
import React from 'react';
import LayoutBase from '../components/Layout/LayoutBase';
import Footer from '../components/Footer';
import urls from '../utils/urls';
import * as overviewUtils from '../utils/overview';
import Publications from './Publications';
import NotFoundPage from './NotFoundPage';

const Overview = (props) => {
  const overviewCategoryName = props.match.params.filter;
  const overviewCategory = overviewUtils.OVERVIEW_CATEGORIES.find(i => i.name === overviewCategoryName);
  if (!overviewCategory) {
    return <NotFoundPage />;
  }
  return (
    <LayoutBase>
      <div className="content-wrapper content_overview">
        <div className="content content_base">
          <div className="content__inner">
            <div className="nav-bar">
              <div className="nav-bar__title">
                <h1 className="title">Overview</h1>
                <div className="nav-bar__categories">
                  {overviewUtils.OVERVIEW_CATEGORIES.map(item => (
                    <div className="menu__item" key={item.id}>
                      <NavLink
                        className="overview__link"
                        activeClassName="overview__link_active"
                        to={urls.getOverviewCategoryUrl({ filter: item.name })}
                        isActive={() => props.location.pathname.indexOf(`filter/${item.name}`) !== -1}
                      >
                        {item.name}
                      </NavLink>
                    </div>
                  ))}
                </div>
              </div>

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
            </div>
          </div>

          <hr className="content__separator" />

          <div className="content__inner">
            <Publications />
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


export default Overview;
