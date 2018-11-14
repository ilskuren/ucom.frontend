import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { bind } from 'decko';
// import classNames from 'classnames';

import { Element } from 'react-scroll';
import { reduxForm } from 'redux-form';

import { emptyValues } from '../../utils/constants';

import { validate } from '../../utils/validators/pages/profile/contacts';

import { selectUserId, selectUserContacts } from '../../store/selectors';
import { selectCommunication } from '../../store/selectors/communication/user';

import Button from '../../components/Button';
import InfoBlock from '../../components/InfoBlock';
import VerticalMenu from '../../components/VerticalMenu';

import TextInputField from '../../components/Field/TextInputField';
import SocialNetworksFieldArray from '../../components/Field/SocialNetworksFieldArray';

import * as actions from '../../actions/';


const mapDispatch = dispatch =>
  bindActionCreators({
    changeUserPersonalWebSiteUrl: actions.changeUserPersonalWebSiteUrl,
    editContacts: actions.editContacts,
  }, dispatch);

const mapStateToProps = state => ({
  userId: selectUserId(state),
  userContacts: selectUserContacts(state),
  editingContacts: selectCommunication(state, 'editingContacts'),
});

class ProfileContactsPage extends PureComponent {
  componentDidMount() {
    const { initialize, array, userContacts } = this.props;

    initialize(this.formatUserContacts(userContacts));
    if (!userContacts.usersSources || userContacts.usersSources.length === 0) {
      array.push('usersSources', '');
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
    const { usersSources } = this.props.userContacts;
    const sourceUrls = (usersSources || []).map(this.formatUserSource);
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
      usersSources: (userContacts.usersSources || [])
        .map(this.formatUserSource)
        .filter(this.removeEmptyWebsiteFields),
    };
  }

  @bind
  handleSubmit(event) {
    const {
      handleSubmit,
      editContacts,
    } = this.props;
    handleSubmit((profile) => {
      editContacts(profile);
    })(event);
  }

  render() {
    const sourceUrls = this.getSourceUrls();
    console.log(this.props, sourceUrls);
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

            <div className="profile__info-block">
              <Element name="Contacts">
                <InfoBlock title="Contacts">
                  {/* <div className="profile__block">
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
                  </div> */}
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
                      name="usersSources"
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
  editContacts: PropTypes.func,
  handleSubmit: PropTypes.func,
  userId: PropTypes.number,
  userContacts: PropTypes.shape({
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    usersSources: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  }),
  array: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(reduxForm({ form: 'contacts', validate, touchOnChange: true })(ProfileContactsPage));
