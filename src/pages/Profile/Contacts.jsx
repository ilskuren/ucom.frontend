import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { bind } from 'decko';
import classNames from 'classnames';
import { Element } from 'react-scroll';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import InfoBlock from '../../components/InfoBlock';
import VerticalMenu from '../../components/VerticalMenu';
import Loading from '../../components/Loading';
import { getToken } from '../../utils/token';
import { patchMyself } from '../../api';
import { convertClientUser } from '../../api/convertors';

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
    const { history } = this.props;
    const { id } = this.props.user;
    Promise
      .resolve()
      .then(() => {
        const { user } = this.props;
        const token = getToken();
        const data = convertClientUser(user);
        this.setState({ loading: true });
        return patchMyself(data, token);
      })
      .then((data) => {
        this.props.setUser(data);
        this.setState({ loading: false });
      })
      .then(() => history.push(`/user/${id}`))
      .catch(err => console.error(err.message));
  }

  render() {
    const { userSources, errors } = this.props.user;
    return (
      <div className="grid grid_profile">
        <div className="grid__item">
          <VerticalMenu
            sections={[
              { title: 'Personal Contacts', name: 'Contacts' },
              { title: 'Social Networks', name: 'SocialNetworks' },
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
                  <div className="profile__block">
                    <TextInput
                      label="Your website"
                      value={this.props.user.personalWebsiteUrl}
                      onChange={this.makeChangeUserFieldHandler('personalWebsiteUrl')}
                      error={errors.personalWebsiteUrl && errors.personalWebsiteUrl[0]}
                    />
                  </div>
                </InfoBlock>
              </Element>
            </div>
            <div className="profile__info-block">
              <Element name="SocialNetworks">
                <InfoBlock title="Social networks">
                  <div className="list__item">
                    <div className="profile__block" key={0}>
                      <TextInput
                        label="Your website"
                        value={Array.isArray(userSources) && userSources.length !== 0 ? userSources[0].sourceUrl : undefined}
                        onChange={this.makeSiteValueChangeHandler(0)}
                        error={this.getWebSiteUrlErrorMessage(0)}
                      />
                    </div>
                    {Array.isArray(userSources) && userSources.length > 1 && (
                      <div className="profile__block">
                        <Button
                          size="small"
                          theme="transparent"
                          text="Remove"
                          onClick={this.makeRemoveSiteClickHandler(0)}
                        />
                      </div>
                    )}
                    {Array.isArray(userSources) && userSources.slice(1).map((item, index) => (
                      <div className="profile__block" key={index + 1}>
                        <div className="profile__block">
                          <TextInput
                            label="Your website"
                            value={userSources[index + 1].sourceUrl || undefined}
                            onChange={this.makeSiteValueChangeHandler(index + 1)}
                            error={this.getWebSiteUrlErrorMessage(index + 1)}
                          />
                        </div>
                        {Array.isArray(userSources) && userSources.length > 1 && (
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
    userSources: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default connect(mapStateToProps, mapDispatch)(ProfileContactsPage);
