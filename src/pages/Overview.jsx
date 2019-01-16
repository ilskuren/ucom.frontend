import { NavLink } from 'react-router-dom';
import React from 'react';
import LayoutBase from '../components/Layout/LayoutBase';
import Footer from '../components/Footer';
import urls from '../utils/urls';
import * as overviewUtils from '../utils/overview';
import Publications from './Publications';

const Overview = (props) => {
  if (0) console.log('');
  return (
    <LayoutBase>
      <div className="content-wrapper content_overview">
        <div className="content content_base">
          <div className="content__inner">
            <div className="nav-bar">
              <div className="nav-bar__title">
                <h1 className="title">Overview</h1>
              </div>

              <div className="nav-bar__menu">
                <div className="toolbar toolbar_responsive">
                  <div className="toolbar__main">
                    <div className="menu menu_simple-tabs">
                      {overviewUtils.OVERVIEW_CATEGORIES.map(item => (
                        <div className="menu__item" key={item.id}>
                          <NavLink
                            className="menu__link"
                            activeClassName="menu__link_active"
                            to={urls.getOverviewCategoryUrl(item.name)}
                            isActive={() => props.location.pathname.indexOf(urls.getOverviewCategoryUrl(item.name)) === 0}
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
