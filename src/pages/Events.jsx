// import { Route } from 'react-router';
// import { NavLink } from 'react-router-dom';
import React from 'react';
// import MediaList from '../components/MediaList';
// import OffersList from '../components/OffersList';
import PostsTable from '../components/PostsTable';
import LayoutBase from '../components/Layout/LayoutBase';

const EventsPage = () => (
  <LayoutBase>
    <div className="content">
      <div className="content__inner">
        <div className="content__title content__title_narrow">
          <div className="toolbar">
            <div className="toolbar__main">
              <div className="inline inline_baseline inline_xlarge">
                <div className="inline__item">
                  {/* <h1 className="title">Events</h1> */}
                  <h1 className="title">Publications</h1>

                </div>
                {/* <div className="inline__item">
                  <div className="menu menu_simple-tabs menu_simple-tabs_small menu_not-responsive">
                    <div className="menu__item">
                      <NavLink
                        className="menu__link"
                        activeClassName="menu__link_active"
                        to="/publications/media"
                        isActive={() => props.location.pathname === '/publications/media'}
                      >
                        Media
                      </NavLink>
                    </div>
                    <div className="menu__item">
                      <NavLink
                        className="menu__link"
                        activeClassName="menu__link_active"
                        to="/publications/offers"
                        isActive={() => props.location.pathname === '/publications/offers'}
                      >
                        Offers
                      </NavLink>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <PostsTable postTypeId={1} />

        {/* <Fragment>
          <Route exact path="/publications/media" component={MediaList} />
          <Route exact path="/publications/offers" component={OffersList} />
        </Fragment> */}
      </div>
    </div>
  </LayoutBase>
);

export default EventsPage;
