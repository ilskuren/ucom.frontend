import { Route } from 'react-router';
import { NavLink } from 'react-router-dom';
import React, { Fragment } from 'react';
import Footer from '../components/Footer';
import MediaList from '../components/MediaList';
import OffersList from '../components/OffersList';

const EventsPage = props => (
  <div className="content">
    <div className="content__inner">
      <div className="content__title">
        <div className="toolbar">
          <div className="toolbar__main">
            <div className="inline inline_baseline inline_xlarge">
              <div className="inline__item">
                <h1 className="title">Events</h1>
              </div>
              <div className="inline__item">
                <div className="menu menu_simple-tabs menu_simple-tabs_black menu_simple-tabs_small menu_not-responsive">
                  <div className="menu__item">
                    <NavLink
                      className="menu__link"
                      activeClassName="menu__link_active"
                      to="/events/media"
                      isActive={() => props.location.pathname === '/events/media'}
                    >
                      Media
                    </NavLink>
                  </div>
                  <div className="menu__item">
                    <NavLink
                      className="menu__link"
                      activeClassName="menu__link_active"
                      to="/events/offers"
                      isActive={() => props.location.pathname === '/events/offers'}
                    >
                      Offers
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Fragment>
        <Route exact path="/events/media" component={MediaList} />
        <Route exact path="/events/offers" component={OffersList} />
      </Fragment>

      <Footer />
    </div>
  </div>
);

export default EventsPage;
