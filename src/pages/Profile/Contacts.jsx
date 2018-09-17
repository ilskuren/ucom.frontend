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

import { scrollAnimation, emptyValues } from '../../utils/constants';

import { selectUserContacts, selectUserId, selectUserLoading } from '../../utils/selectors/user';
import { validate } from '../../utils/validators/pages/profile/contacts';
import * as actions from '../../actions/';

const mapDispatch = dispatch =>
  bindActionCreators({
    changeUserPersonalWebSiteUrl: actions.changeUserPersonalWebSiteUrl,
    editUserContacts: actions.editUserContacts,
    setLoading: actions.setLoading,
  }, dispatch);

const mapStateToProps = state => ({
  userId: selectUserId(state),
  userContacts: selectUserContacts(state),
  loading: selectUserLoading(state),
});

class ProfileContactsPage extends PureComponent {
  componentDidMount() {
    this.props.setLoading(false);
    const { initialize, array, userContacts } = this.props;
    initialize(this.formatUserContacts(userContacts));
    if (userContacts.userSources.length === 0) {
      array.push('userSources', '');
    }
  }

  componentDidUpdate() {
    const { userId, submitSucceeded, history } = this.props;
    if (submitSucceeded) {
      history.push(`/user/${userId}`);
    }
  }

  @bind
  getSourceUrls() {
    const { userSources } = this.props.userContacts;
    const sourceUrls = userSources.map(this.formatUserSource);
    return sourceUrls;
  }

  removeEmptyWebsiteFields(sourceUrl) {
    return !emptyValues.includes(sourceUrl);
  }

  formatUserSource(userSource) {
    return userSource.sourceUrl ? userSource.sourceUrl : userSource;
  }

  @bind
  formatUserContacts(userContacts) {
    return {
      ...userContacts,
      userSources: userContacts.userSources
        .map(this.formatUserSource)
        .filter(this.removeEmptyWebsiteFields),
    };
  }

  @bind
  handleSubmit(event) {
    const {
      handleSubmit,
      editUserContacts,
    } = this.props;
    handleSubmit((profile) => {
      editUserContacts(profile);
    })(event);
  }

  render() {
    const sourceUrls = this.getSourceUrls();
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
            <Loading loading={this.props.loading} className="loading_block" />

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
                      sourceUrls={sourceUrls}
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
  initialize: PropTypes.func,
  submitSucceeded: PropTypes.bool,
  editUserContacts: PropTypes.func,
  handleSubmit: PropTypes.func,
  userId: PropTypes.number,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
  userContacts: PropTypes.shape({
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    userSources: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  }),
  array: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(reduxForm({ form: 'contacts', validate, touchOnChange: true })(ProfileContactsPage));
