import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { bind } from 'decko';
import classNames from 'classnames';
import { scroller, Element } from 'react-scroll';
import { reduxForm } from 'redux-form';

import Button from '../../components/Button';
import InfoBlock from '../../components/InfoBlock';
import VerticalMenu from '../../components/VerticalMenu';
import Loading from '../../components/Loading';

import TextInputField from '../../components/Field/TextInputField';
import SocialNetworksFieldArray from '../../components/Field/SocialNetworksFieldArray';

import { scrollAnimation } from '../../utils/constants';

import { selectUserContacts, selectUserId } from '../../utils/selectors/user';
import { urlRegex, emailRegex, phoneNumberRegex } from '../../utils/validators/constants';
import { validateArrayUrls } from '../../utils/validators/custom';
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
    editUser: actions.editUser,
  }, dispatch);

const mapStateToProps = state => ({
  userId: selectUserId(state),
  userContacts: selectUserContacts(state),
});

class ProfileContactsPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    const { initialize, array, userContacts } = this.props;
    initialize(userContacts);
    if (userContacts.userSources.length === 0) {
      array.push('userSources', '');
    }
  }

  componentWillUnmount() {
    this.props.clearErrors();
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
  handleSubmit(event) {
    const {
      handleSubmit,
      editUser,
      userId,
      history,
    } = this.props;
    handleSubmit((profile) => {
      editUser(profile);
    })(event);
    history.push(`/user/${userId}`);
  }

  render() {
    const { userSources } = this.props.userContacts;
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
                    <TextInputField
                      label="Email"
                      name="email"
                    />
                  </div>
                  <div
                    className={classNames(
                      'profile__block',
                      'profile__block_phone-number',
                    )}
                  >
                    <TextInputField
                      label="Phone number"
                      name="phoneNumber"
                    />
                  </div>
                  <div className="profile__block">
                    <TextInputField
                      label="Your website"
                      name="personalWebsiteUrl"
                    />
                  </div>
                </InfoBlock>
              </Element>
            </div>
            <div className="profile__info-block">
              <Element name="SocialNetworks">
                <InfoBlock title="Social networks">
                  <div className="list__item">
                    <SocialNetworksFieldArray
                      userSources={userSources}
                      name="userSources"
                    />
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
  initialize: PropTypes.func,
  removeUserPersonalWebSite: PropTypes.func,
  changeUserPersonalWebSiteUrl: PropTypes.func,
  editUser: PropTypes.func,
  handleSubmit: PropTypes.func,
  userId: PropTypes.number,
  userContacts: PropTypes.shape({
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    userSources: PropTypes.arrayOf(PropTypes.object),
  }),
  array: PropTypes.shape({
    push: PropTypes.func,
  }),
};

const validate = (values) => {
  const errors = {};
  if (!emailRegex.test(values.email)) {
    errors.email = 'The field name email format is invalid.';
  }
  if (!urlRegex.test(values.personalWebsiteUrl)) {
    errors.personalWebsiteUrl = 'The field name url format is invalid.';
  }
  if (!phoneNumberRegex.test(values.phoneNumber)) {
    errors.phoneNumber = 'The field name url format is invalid.';
  }
  if (values.userSources) {
    const resultsOfValidateUrlsArray = validateArrayUrls(values.userSources.map(x => (x.sourceUrl ? x.sourceUrl : x)));
    if (!resultsOfValidateUrlsArray.isValid) {
      errors.userSources = values.userSources.map((x, i) => {
        const currentUrlValidationResult = resultsOfValidateUrlsArray.results[i];
        if (currentUrlValidationResult.isInvalidUrl) {
          return currentUrlValidationResult.message;
        }
        return undefined;
      });
    }
  }
  return errors;
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(reduxForm({ form: 'contacts', validate })(ProfileContactsPage));
