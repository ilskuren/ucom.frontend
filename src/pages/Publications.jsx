import { Route, Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import React from 'react';
import LayoutBase from '../components/Layout/LayoutBase';
import Footer from '../components/Footer';
import urls from '../utils/urls';
import FeedCategories from '../components/Feed/FeedCategories';

const PUBLICATIONS_CATREGORIES = [{
  id: 1,
  name: 'hot',
}, {
  id: 2,
  name: 'trending',
}, {
  id: 3,
  name: 'fresh',
}, {
  id: 4,
  name: 'top',
}];

const Publications = props => (
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
                    {PUBLICATIONS_CATREGORIES.map(item => (
                      <div className="menu__item" key={item.id}>
                        <NavLink
                          className="menu__link"
                          activeClassName="menu__link_active"
                          to={urls.getPublicationsCategoryUrl(item.name)}
                          isActive={() => props.location.pathname === urls.getPublicationsCategoryUrl(item.name)}
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
          <div className="content__section content__section_small">
            <Route exact path={urls.getPublicationsUrl()} render={() => <Redirect to={urls.getPublicationsCategoryUrl(PUBLICATIONS_CATREGORIES[0].name)} />} />
            {PUBLICATIONS_CATREGORIES.map(item => (
              <Route exact key={item.id} path={urls.getPublicationsCategoryUrl(item.name)} render={() => <FeedCategories categoryName={item.name} />} />
            ))}
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

export default Publications;
