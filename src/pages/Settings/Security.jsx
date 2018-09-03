import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Switcher from '../../components/Switcher';

import * as actions from '../../actions/settings';

const mapDispatch = dispatch =>
  bindActionCreators({
    setSettingsSecurityData: actions.setSettingsSecurityData,
    resetSettingsSecurity: actions.resetSettingsSecurity,
    validateSettingsSecurity: actions.validateSettingsSecurity,
    validateSettingsSecurityField: actions.validateSettingsSecurityField,
  }, dispatch);


const mapStateToProps = state => ({
  user: state.user,
  security: state.settings.security,
});

class SettingsSecurityPage extends PureComponent {
  render() {
    return (
      <div className="settings">
        <div className="form">
          <div className="form__block">
            <div className="form__label">Auto-login</div>
            <div className="form__input">
              <Switcher onChange={(auto_login) => {
                this.props.setSettingsSecurityData({ auto_login });
                this.props.validateSettingsSecurityField('auto_login');
                }}
              />
            </div>
          </div>
          <div className="form__block">
            <div className="form__label">2FA</div>
            <div className="form__input">
              <Switcher onChange={(two_fa) => {
                this.props.setSettingsSecurityData({ two_fa });
                this.props.validateSettingsSecurityField('two_fa');
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SettingsSecurityPage.propTypes = {
  setSettingsSecurityData: PropTypes.func,
  validateSettingsSecurityField: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatch)(SettingsSecurityPage);
