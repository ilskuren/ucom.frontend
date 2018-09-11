import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { bind } from 'decko';
import classNames from 'classnames';
import { scroller, Element } from 'react-scroll';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import InfoBlock from '../../components/InfoBlock';
import VerticalMenu from '../../components/VerticalMenu';
import Loading from '../../components/Loading';
import { getToken } from '../../utils/token';
import { patchMyself } from '../../api';
import { scrollAnimation } from '../../utils/constants';

import { selectUser } from '../../utils/selectors/user';
import * as actions from '../../actions/';

const mapDispatch = dispatch =>
  bindActionCreators({
    changeUserField: actions.changeUserField,
    clearErrors: actions.clearErrors,
    changeUserPersonalWebSiteUrl: actions.changeUserPersonalWebSiteUrl,
    addUserPersonalWebSite: actions.addUserPersonalWebSite,
    removeUserPersonalWebSite: actions.removeUserPersonalWebSite,
    validateProfileForm: actions.validateProfileForm,
    setUser: actions.setUser,
  }, dispatch);

const mapStateToProps = state => ({
  user: selectUser(state),
});

class ProfileContactsPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  @bind
  getWebSiteUrlErrorMessage(index) {
    const { errors } = this.props.user;
    return errors.personalWebsitesUrls &&
      errors.personalWebsitesUrls.results &&
        errors.personalWebsitesUrls.results[index] &&
          errors.personalWebsitesUrls.results[index].isInvalidUrl &&
            errors.personalWebsitesUrls.results[index].message;
  }

  @bind
  makeRemoveSiteClickHandler(index) {
    return () => this.props.removeUserPersonalWebSite(index);
  }

  @bind
  makeSiteValueChangeHandler(index) {
    return value => this.props.changeUserPersonalWebSiteUrl({ index, value });
  }

  @bind
  makeChangeUserFieldHandler(field) {
    return value => this.props.changeUserField({ field, value, validationRules: 'contactsRules' });
  }

  @bind
  handleSubmit(e) {
    this.props.validateProfileForm('contactsRules');
    const { isValid } = this.props.user;
    e.preventDefault();
    debugger;
    if (isValid) {
      this.save();
    }
  }

  save() {
    const { user } = this.props;
    const token = getToken();

    const data = {
      email: user.email,
      phoneNumber: user.phoneNumber,
      personalWebsitesUrls: user.personalWebsitesUrls,
    };

    this.setState({ loading: true });

    patchMyself(data, token).then((data) => {
      this.props.setUser(data);
      this.setState({ loading: false });
    });
  }

  render() {
    const { personalWebsitesUrls, errors } = this.props.user;
    return (
      <div className="grid grid_profile">
        <div className="grid__item">
          <VerticalMenu
            sections={[
              { type: 'personal contacts', percents: '0', onClick: () => scroller.scrollTo('Contacts', scrollAnimation) },
              { type: 'social networks', percents: '0', onClick: () => scroller.scrollTo('SocialNetworks', scrollAnimation) },
            ]}
          />
        </div>
        <div className="grid__item">
          <form
            className="person-form"
            onSubmit={this.handleSubmit}
          >
            <Loading loading={this.state.loading} className="loading_block" />

            <div className="profile__info-block">
              <Element name="Contacts">
                <InfoBlock title="Contacts">
                  <div className="profile__block">
                    <TextInput
                      label="Email"
                      value={this.props.user.email}
                      onChange={this.makeChangeUserFieldHandler('email')}
                      error={errors.email && errors.email[0]}
                    />
                  </div>
                  <div
                    className={classNames(
                      'profile__block',
                      'profile__block_phone-number',
                    )}
                  >
                    <TextInput
                      label="Phone number"
                      value={this.props.user.phoneNumber}
                      onChange={this.makeChangeUserFieldHandler('phoneNumber')}
                      error={errors.phoneNumber && errors.phoneNumber[0]}
                    />
                  </div>
                </InfoBlock>
              </Element>
            </div>
            <div className="profile__info-block">
              <Element name="SocialNetworks">
                <InfoBlock title="Social networks">
                  <div className="list__item">
                    <div className="profile__block">
                      <TextInput
                        label="Your website"
                        value={Array.isArray(personalWebsitesUrls) ? personalWebsitesUrls[0] : ''}
                        onChange={this.makeSiteValueChangeHandler(0)}
                        error={this.getWebSiteUrlErrorMessage(0)}
                      />
                    </div>
                    {Array.isArray(personalWebsitesUrls) && personalWebsitesUrls.length !== 1 && (
                      <div className="profile__block">
                        <Button
                          size="small"
                          theme="transparent"
                          text="Remove"
                          onClick={this.makeRemoveSiteClickHandler(0)}
                        />
                      </div>
                    )}
                    {Array.isArray(personalWebsitesUrls) && personalWebsitesUrls.slice(1).map((item, index) => (
                      <div className="profile__block" key={index + 1}>
                        <div className="profile__block">
                          <TextInput
                            label="Your website"
                            value={personalWebsitesUrls[index + 1]}
                            onChange={this.makeSiteValueChangeHandler(index + 1)}
                            error={this.getWebSiteUrlErrorMessage(index + 1)}
                          />
                        </div>
                        {Array.isArray(personalWebsitesUrls) && personalWebsitesUrls.length !== 1 && (
                          <div className="profile__block">
                            <Button
                              size="small"
                              theme="transparent"
                              text="Remove"
                              onClick={this.makeRemoveSiteClickHandler(index + 1)}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="profile__block">
                      <Button
                        size="small"
                        theme="transparent"
                        text="Add another"
                        onClick={this.props.addUserPersonalWebSite}
                      />
                    </div>
                  </div>
                </InfoBlock>
              </Element>
              <div className="profile__block">
                <Button
                  type="submit"
                  text="FINISH"
                  size="big"
                  theme="red"
                  isStretched
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ProfileContactsPage.propTypes = {
  changeUserField: PropTypes.func,
  clearErrors: PropTypes.func,
  addUserPersonalWebSite: PropTypes.func,
  removeUserPersonalWebSite: PropTypes.func,
  changeUserPersonalWebSiteUrl: PropTypes.func,
  validateProfileForm: PropTypes.func,
  user: PropTypes.shape({
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    personalWebsitesUrls: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default connect(mapStateToProps, mapDispatch)(ProfileContactsPage);
