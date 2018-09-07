import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { bind } from 'decko';
import classNames from 'classnames';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import InfoBlock from '../../components/InfoBlock';
import VerticalMenu from '../../components/VerticalMenu';
import Loading from '../../components/Loading';
import { setUser } from '../../actions';
import { getToken } from '../../utils/token';
import { patchMyself } from '../../api';

import * as actions from '../../actions/profile';
import * as selectors from '../../utils/selectors/profile';

const mapDispatch = dispatch =>
  bindActionCreators({
    changeEmailValue: actions.changeEmailValue,
    changePhoneValue: actions.changePhoneValue,
    changeSiteValue: actions.changeSiteValue,
    addSite: actions.addSite,
    removeSite: actions.removeSite,
    validateContacts: actions.validateContacts,
    setUser,
  }, dispatch);


const mapStateToProps = state => ({
  user: state.user,
  email: selectors.selectProfileContacts(state).data.email,
  phoneNumber: selectors.selectProfileContacts(state).data.phoneNumber,
  websiteUrls: selectors.selectProfileContacts(state).data.websiteUrls,
  errors: state.profile.contacts.errors,
  isValid: selectors.selectProfileContacts(state).isValid,
});

class ProfileContactsPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  @bind
  getErrorMessage(index) {
    const { errors } = this.props;
    return errors.websiteUrls.results[index] && errors.websiteUrls.results[index].isInvalidUrl && errors.websiteUrls.results[index].message;
  }

  @bind
  makeRemoveSiteClickHandler(index) {
    return () => this.props.removeSite(index);
  }

  @bind
  handleSiteValueChange(index, value) {
    this.props.changeSiteValue({ index, value });
  }

  @bind
  handleSubmit(e) {
    this.props.validateContacts();
    const { isValid } = this.props;
    if (!isValid) {
      e.preventDefault();
    } else {
      e.preventDefault();
      this.save();
    }
  }

  save() {
    const token = getToken();

    const data = {
      email: this.props.email,
      phoneNumber: this.props.phoneNumber,
      websiteUrls: this.props.websiteUrls,
    };

    this.setState({ loading: true });

    patchMyself(data, token).then((data) => {
      this.props.setUser(data);
      this.setState({ loading: false });
    });
  }

  render() {
    const { websiteUrls, errors } = this.props;
    const paddingFromFirstInput = 1;
    return (
      <div className="grid grid_profile">
        <div className="grid__item">
          <VerticalMenu
            sections={[
              { type: 'personal contacts', percents: '0' },
              { type: 'social networks', percents: '0' },
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
              <InfoBlock title="Contacts">
                <div className="profile__block">
                  <TextInput
                    label="Email"
                    value={this.props.email}
                    onChange={this.props.changeEmailValue}
                    error={errors.email && errors.email[0]}
                  />
                </div>
                <div
                  className={classNames(
                    'profile__block',
                    'profile__block_email',
                  )}
                >
                  <TextInput
                    label="Phone number"
                    value={this.props.phoneNumber}
                    onChange={this.props.changePhoneValue}
                    error={errors.phoneNumber && errors.phoneNumber[0]}
                  />
                </div>
              </InfoBlock>
            </div>
            <div className="profile__info-block">
              <InfoBlock title="Social networks">
                <div className="profile__block">
                  <TextInput
                    label="Your website"
                    value={websiteUrls[0]}
                    onChange={value => this.handleSiteValueChange(0, value)}
                    error={this.getErrorMessage(0)}
                  />
                </div>
                <div className="list__item">
                  {!websiteUrls.length !== 0 && websiteUrls.slice(1).map((item, index) => (
                    <div className="profile__block" key={index}>
                      <div className="profile__block">
                        <TextInput
                          label="Your website"
                          value={websiteUrls[index + paddingFromFirstInput]}
                          onChange={value => this.handleSiteValueChange(index + paddingFromFirstInput, value)}
                          error={this.getErrorMessage(index + paddingFromFirstInput)}
                        />
                      </div>
                      <div className="profile__block">
                        <button
                          type="button"
                          className="button button_theme_transparent button_size_small"
                          onClick={this.makeRemoveSiteClickHandler(index + paddingFromFirstInput)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="profile__block">
                    <button
                      type="button"
                      className="button button_theme_transparent button_size_small"
                      onClick={this.props.addSite}
                    >
                      Add another
                    </button>
                  </div>
                </div>
              </InfoBlock>
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

export default connect(mapStateToProps, mapDispatch)(ProfileContactsPage);
