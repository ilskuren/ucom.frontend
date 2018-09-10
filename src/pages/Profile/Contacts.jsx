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
import { setUser } from '../../actions';
import { getToken } from '../../utils/token';
import { patchMyself } from '../../api';
import { scrollAnimation } from '../../utils/constants';

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
  email: selectors.selectProfileContacts(state).data.email,
  phoneNumber: selectors.selectProfileContacts(state).data.phoneNumber,
  websiteUrls: selectors.selectProfileContacts(state).data.websiteUrls,
  errors: selectors.selectProfileContacts(state).errors,
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
  makeSiteValueChangeHandler(index) {
    return value => this.props.changeSiteValue({ index, value });
  }

  @bind
  handleSubmit(e) {
    this.props.validateContacts();
    const { isValid } = this.props;
    e.preventDefault();
    if (isValid) {
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
              </Element>
            </div>
            <div className="profile__info-block">
              <Element name="SocialNetworks">
                <InfoBlock title="Social networks">
                  <div className="list__item">
                    {websiteUrls.map((item, index) => (
                      <div className="profile__block" key={index}>
                        <div className="profile__block">
                          <TextInput
                            label="Your website"
                            value={websiteUrls[index]}
                            onChange={this.makeSiteValueChangeHandler(index)}
                            error={this.getErrorMessage(index)}
                          />
                        </div>
                        {websiteUrls.length !== 1 && (
                          <div className="profile__block">
                            <Button
                              size="small"
                              theme="transparent"
                              text="Remove"
                              onClick={this.makeRemoveSiteClickHandler(index)}
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
                        onClick={this.props.addSite}
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
  changeEmailValue: PropTypes.func,
  removeSite: PropTypes.func,
  changeSiteValue: PropTypes.func,
  changePhoneValue: PropTypes.func,
  validateContacts: PropTypes.func,
  addSite: PropTypes.func,
  phoneNumber: PropTypes.string,
  email: PropTypes.string,
  isValid: PropTypes.bool,
  websiteUrls: PropTypes.arrayOf(PropTypes.string),
  errors: PropTypes.shape({
    email: PropTypes.array,
    phoneNumber: PropTypes.array,
    websiteUrls: PropTypes.shape({
      isErrorExists: PropTypes.bool,
      results: PropTypes.arrayOf(PropTypes.object),
    }),
  }),
};

export default connect(mapStateToProps, mapDispatch)(ProfileContactsPage);
