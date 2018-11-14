import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Element } from 'react-scroll';
import React, { PureComponent, Fragment } from 'react';
import { selectUser } from '../store/selectors/user';
import VerticalMenu from '../components/VerticalMenu';
import TextInput from '../components/TextInput';
import Textarea from '../components/Textarea';
import Footer from '../components/Footer';
import SocialNetworks from '../components/SocialNetworks';

// import ProfileGeneralInfoPage from './Profile/GeneralInfo';
// import ProfileWorkAndEducationPage from './Profile/WorkAndEducation';
// import ProfileContactsPage from './Profile/Contacts';

class ProfilePage extends PureComponent {
  state={
    sourceUrls: [{ sourceUrl: 'tu' }, { sourceUrl: '23y33' }],
  }
  render() {
    console.log(this.props.user);
    return this.props.user.id ? (
      <div className="content">
        <div className="content__inner content__inner_medium">
          <div className="content__title content__title_between">
            <h1 className="title">Edit Profile</h1>
            <Link to={`/user/${this.props.user.id}`} className="button button_theme_transparent button_size_small">
              Back to Profile
            </Link>
          </div>
        </div>

        <div className="content">
          <div className="content__inner">
            <Fragment>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // props.setOrganizationActiveTab(STEPS_ID_COMMUNITY);
                }}
              >
                <div className="grid grid_settings">
                  <div className="grid__item grid__item_side">
                    <VerticalMenu
                      sections={[
                        { name: 'PersonalInfo', title: 'Personal info' },
                        { name: 'PersonalContacts', title: 'Personal contacts' },
                        { name: 'SocialNetworks', title: 'Social networks' },
                      ]}
                    />
                  </div>
                  <div className="grid__item grid__item_main">
                    <div className="fields">
                      <Element name="PersonalInfo">
                        <div className="fields__title">
                          <h1 className="title title_small">Personal info</h1>
                        </div>

                        <div className="fields__item">
                          <div className="field">
                            <div className="field__label">Displayed name</div>
                            <div className="field__input">
                              <TextInput />
                            </div>
                          </div>
                        </div>
                        <div className="fields__item">
                          <div className="field">
                            <div className="field__label">About me</div>
                            <div className="field__input">
                              <Textarea
                                placeholder="Type something..."
                                rows={6}
                              />
                            </div>
                          </div>
                        </div>
                      </Element>
                      <Element name="PersonalContacts">
                        <div className="fields__title">
                          <h1 className="title title_small">Personal contacts</h1>
                        </div>
                        <div className="fields__item">
                          <div className="field">
                            <div className="field__label">Your website</div>
                            <div className="field__input">
                              <TextInput />
                            </div>
                          </div>
                        </div>
                      </Element>
                      <Element name="SocialNetworks">
                        <div className="fields__title">
                          <h1 className="title title_small">Social networks</h1>
                        </div>
                        <SocialNetworks fields={this.state.sourceUrls} />
                        {/* <div className="fields__item">
                          <div className="field">
                            <div className="field__label">Your website</div>
                            <div className="field__input">
                              <TextInput />
                            </div>
                          </div>
                        </div> */}
                      </Element>
                    </div>
                  </div>
                </div>
              </form>
              {/* <Route exact path="/profile/general-info" component={ProfileGeneralInfoPage} /> */}
              {/* <Route exact path="/profile/work-and-education" component={ProfileWorkAndEducationPage} /> */}
              {/* <Route exact path="/profile/contacts" component={ProfileContactsPage} /> */}
            </Fragment>

            <Footer />
          </div>
        </div>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

export default connect(state => ({
  user: selectUser(state),
}), null)(ProfilePage);
