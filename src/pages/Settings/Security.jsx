import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

const SettingsSecurityPage = () => (
  <div className="settings">
    <div className="form">
      <div className="form__block">
        <div className="form__label">Auto-login</div>
        <div className="form__input">
          <Switcher />
        </div>
      </div>
      <div className="form__block">
        <div className="form__label">2FA</div>
        <div className="form__input">
          <Switcher />
        </div>
      </div>
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatch)(SettingsSecurityPage);
