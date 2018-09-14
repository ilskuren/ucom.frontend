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

import { getToken } from '../../utils/token';
import { patchMyself } from '../../api';
import { convertClientUser } from '../../api/convertors';
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

  componentDidMount() {
    const { initialize } = this.props;
    const { user } = this.props;
    initialize({
      email: user.firstName,
      phoneNumber: user.phoneNumber,
      personalWebsiteUrl: user.personalWebsiteUrl,
      userSources: user.userSources,
    });
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  @bind
  getWebSiteUrlErrorMessage(index) {
    const { errors } = this.props.user;
    return errors.userSources &&
      errors.userSources.results &&
        errors.userSources.results[index] &&
          errors.userSources.results[index].isInvalidUrl &&
            errors.userSources.results[index].message;
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
    e.preventDefault();
    Promise.resolve()
      .then(this.props.validateProfileForm('contactsRules'))
      .then(() => {
        const { isValid } = this.props.user;
        if (isValid) {
          this.save();
        }
      })
      .catch(err => console.error(err.message));
  }

  @bind
  save() {
    const { user } = this.props;
    const token = getToken();
    const data = convertClientUser(user);

    this.setState({ loading: true });

    patchMyself(data, token).then((data) => {
      this.props.setUser(data);
      this.setState({ loading: false });
    });
  }

  render() {
    const { userSources } = this.props.user;
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
  validateProfileForm: PropTypes.func,
  user: PropTypes.shape({
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    userSources: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(reduxForm({ form: 'contacts' })(ProfileContactsPage));
