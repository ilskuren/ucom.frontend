import { Route, Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import React from 'react';
import LayoutBase from '../components/Layout/LayoutBase';
import Footer from '../components/Footer';
import urls from '../utils/urls';
import FeedCategories from '../components/Feed/FeedCategories';
import {
  POSTS_CATREGORIES_HOT_ID,
  POSTS_CATREGORIES_TRENDING_ID,
  POSTS_CATREGORIES_FRESH_ID,
  POSTS_CATREGORIES_TOP_ID,
} from '../utils/posts';

const POSTS_CATREGORIES = [{
  id: POSTS_CATREGORIES_HOT_ID,
  name: 'hot',
}, {
  id: POSTS_CATREGORIES_TRENDING_ID,
  name: 'trending',
}, {
  id: POSTS_CATREGORIES_FRESH_ID,
  name: 'fresh',
}, {
  id: POSTS_CATREGORIES_TOP_ID,
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
                    {POSTS_CATREGORIES.map(item => (
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
            <Route exact path={urls.getPublicationsUrl()} render={() => <Redirect to={urls.getPublicationsCategoryUrl(POSTS_CATREGORIES[0].name)} />} />
            {POSTS_CATREGORIES.map(item => (
              <Route exact key={item.id} path={urls.getPublicationsCategoryUrl(item.name)} render={() => <FeedCategories categoryId={item.id} categoryName={item.name} />} />
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
