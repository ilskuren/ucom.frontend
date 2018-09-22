import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bind } from 'decko';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as selectors from '../../store/selectors/settings';
import TextInput from '../../components/TextInput';
import Dropdown from '../../components/Dropdown';
import PrefixInput from '../../components/PrefixInput';
import Link from '../../components/Link';
import KYC from '../../components/KYC';

import * as actions from '../../actions/settings';

const mapDispatch = dispatch =>
  bindActionCreators({
    setSettingsAccountData: actions.setSettingsAccountData,
    resetSettingsAccount: actions.resetSettingsAccount,
    validateSettingsAccountField: actions.validateSettingsAccountField,
  }, dispatch);


const mapStateToProps = state => ({
  account: selectors.selectSettingsAccount(state),
});

class SettingsAccountPage extends PureComponent {
  componentDidMount() {

  }

  @bind
  makeHandleTextInputChange(inputName) {
    return (value) => {
      this.props.setSettingsAccountData({ [inputName]: value });
      this.props.validateSettingsAccountField(inputName);
    };
  }

  render() {
    return (
      <div className="settings">
        <div className="form">
          <div className="form__block">
            <div className="form__label">Email</div>
            <div className="form__input">
              <TextInput
                value={this.props.account.data.email}
                error={this.props.account.errors.email && this.props.account.errors.email[0]}
                onChange={this.makeHandleTextInputChange('email')}
              />
            </div>
          </div>
          <div className="form__block">
            <div className="form__label">Password</div>
            <div className="form__input">
              <TextInput
                type="password"
                value={this.props.account.data.password}
                error={this.props.account.errors.password && this.props.account.errors.password[0]}
                onChange={this.makeHandleTextInputChange('password')}
              />
              <div className="form__change-password-button">
                <Link href="#">Change password</Link>
              </div>
            </div>
          </div>

          <div className="form__block">
            <div className="form__label">Profile link</div>
            <div className="form__input">
              <PrefixInput
                prefix="u.community/"
                subtext="You can change your profile URL once"
                value={this.props.account.data.prefix_input}
                error={this.props.account.errors.prefix_input && this.props.account.errors.prefix_input[0]}
                onChange={this.makeHandleTextInputChange('profileLink')}
              />
            </div>
          </div>
          <div className="form__block">
            <div className="form__label">KYC</div>
            <div className="form__input"><KYC title="Not verified" link="#" /></div>
          </div>
          <div className="form__block">
            <div className="form__label">Timezone</div>
            <div className="form__input"><Dropdown options={[]} /></div>
          </div>
          <div className="form__block">
            <div className="form__label">Language</div>
            <div className="form__input"><Dropdown options={[]} /></div>
          </div>
          <div className="form__block">
            <div className="form__label">Currency</div>
            <div className="form__input"><Dropdown options={[]} /></div>
          </div>
        </div>
      </div>
    );
  }
}

SettingsAccountPage.propTypes = {
  account: PropTypes.shape({
    data: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string,
      prefix_input: PropTypes.string,
    }),
    errors: PropTypes.shape({
      email: PropTypes.array,
      password: PropTypes.array,
      prefix_input: PropTypes.array,
    }),
  }),
  setSettingsAccountData: PropTypes.func,
  validateSettingsAccountField: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatch)(SettingsAccountPage);
