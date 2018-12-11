import { Route, Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import LayoutBase from '../components/Layout/LayoutBase';
import Footer from '../components/Footer';
import urls from '../utils/urls';
import FeedCategories from '../components/Feed/FeedCategories';
import UserList from '../components/User/UserList';
import OrganizationList from '../components/Organization/OrganizationList';
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

const USERS_LIMIT = 5;
const ORGANIZATION_LIMIT = 5;

const Publications = (props) => {
  const [usersIds, setUserIds] = useState([]);
  const [orgsIds, setOrgIds] = useState([]);
  const sortUserIds = usersIds.filter((item, pos) => (
    usersIds.indexOf(item) === pos
  ));
  const sortOrgIds = orgsIds.filter((item, pos) => (
    orgsIds.indexOf(item) === pos && item !== null

  ));

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
                      {POSTS_CATREGORIES.map(item => (
                        <div className="menu__item" key={item.id}>
                          <NavLink
                            className="menu__link"
                            activeClassName="menu__link_active"
                            to={urls.getPublicationsCategoryUrl(item.name)}
                            isActive={() => props.location.pathname === urls.getPublicationsCategoryUrl(item.name)}
                            onClick={() => {
                              setUserIds([]);
                              setOrgIds([]);
                            }}
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

          <div className="grid grid_content">
            <div className="grid__item grid__item_main">
              <Route exact path={urls.getPublicationsUrl()} render={() => <Redirect to={urls.getPublicationsCategoryUrl(POSTS_CATREGORIES[0].name)} />} />
              {POSTS_CATREGORIES.map(item => (
                <Route exact key={item.id} path={urls.getPublicationsCategoryUrl(item.name)} render={() => <FeedCategories onUsersAdd={data => setUserIds(usersIds.concat(data))} onOrgsAdd={data => setOrgIds(orgsIds.concat(data))} categoryId={item.id} categoryName={item.name} />} />
              ))}
            </div>

            <div className="grid__item grid__item_side">
              <div className="feed_side">
                <div className="sidebar">
                  {sortUserIds.length !== 0 && (
                    <div className="user-section">
                      <div className="user-section__title">
                        <h2 className="title title_xxsmall title_medium">
                          People&nbsp;
                          {sortUserIds.length > USERS_LIMIT && <em>{sortUserIds.length}</em>}
                        </h2>
                      </div>
                      <UserList usersIds={sortUserIds} limit={USERS_LIMIT} />
                    </div>
                  )}
                  {sortOrgIds.length !== 0 && (
                    <div className="user-section">
                      <div className="user-section__title">
                        <h2 className="title title_xxsmall title_medium">
                          Organizations&nbsp;
                          {sortOrgIds.length > ORGANIZATION_LIMIT && <em>{sortOrgIds.length}</em>}
                        </h2>
                      </div>
                      <OrganizationList limit={ORGANIZATION_LIMIT} organizationsIds={sortOrgIds} />
                    </div>
                  )}
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

export default Publications;
