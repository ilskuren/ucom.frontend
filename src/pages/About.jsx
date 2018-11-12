import { Route, Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import React, { PureComponent, Fragment } from 'react';
import Footer from '../components/Footer';
import AboutGeneralInfoPage from './About/AboutGeneralInfo';

class AboutPage extends PureComponent {
  componentDidMount() {
  }

  render() {
    return (
      <Fragment>
        <div className="content-wrapper">
          <div className="content content_separated">
            <div className="content__inner">
              <div className="nav-bar nav-bar_simple">
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
                            isActive={() => this.props.location.pathname === '/about/general-info'}
                          >
                            General Info
                          </NavLink>
                        </div>
                        <div className="menu__item">
                          <NavLink
                            className="menu__link"
                            activeClassName="menu__link_active"
                            to="/about/user-agreement"
                            isActive={() => this.props.location.pathname === '/about/work-and-education'}
                          >
                            User agreement
                          </NavLink>
                        </div>
                        <div className="menu__item">
                          <NavLink
                            className="menu__link"
                            activeClassName="menu__link_active"
                            to="/about/privacy-policy"
                            isActive={() => this.props.location.pathname === '/about/contacts'}
                          >
                            Privacy policy
                          </NavLink>
                        </div>
                        <div className="menu__item">
                          <NavLink
                            className="menu__link"
                            activeClassName="menu__link_active"
                            to="/about/legal-registration"
                            isActive={() => this.props.location.pathname === '/about/contacts'}
                          >
                            Legal registration
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="content">
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
      </Fragment>
    );
  }
}


export default AboutPage;
