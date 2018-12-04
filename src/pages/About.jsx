import { Route, Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import React, { Fragment } from 'react';
import Footer from '../components/Footer';
import AboutGeneralInfoPage from './About/AboutGeneralInfo';
import LayoutBase from '../components/Layout/LayoutBase';

const AboutPage = props => (
  <LayoutBase>
    <div className="content-wrapper">
      <div className="content content_base">
        <div className="content__inner">
          <div className="nav-bar">
            <div className="nav-bar__title">
              <h1 className="title">About</h1>
            </div>
            <div className="nav-bar__menu">
              <div className="toolbar toolbar_responsive">
                <div className="toolbar__main">
                  <div className="menu menu_simple-tabs">
                    <div className="menu__item">
                      <NavLink
                        className="menu__link"
                        activeClassName="menu__link_active"
                        to="/about/general-info"
                        isActive={() => props.location.pathname === '/about/general-info'}
                      >
                        General Info
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="content__separator" />

        <div className="content__inner">
          <Fragment>
            <Route path="/about" render={() => <Redirect to="/about/general-info" />} />
            <Route exact path="/about/general-info" component={AboutGeneralInfoPage} />
          </Fragment>
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

export default AboutPage;
