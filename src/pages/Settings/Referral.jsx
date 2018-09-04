import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InputWithCopy from '../../components/InputWithCopy';
import Accordeon from '../../components/Accordeon';

import * as actions from '../../actions/settings';

const mapDispatch = dispatch =>
  bindActionCreators({
    setSettingsSecurityData: actions.setSettingsSecurityData,
    resetSettingsSecurity: actions.resetSettingsSecurity,
    validateSettingsSecurityField: actions.validateSettingsSecurityField,
  }, dispatch);


const mapStateToProps = state => ({
  user: state.user,
  security: state.settings.security,
});

class SettingsReferralPage extends PureComponent {
  componentDidMount() {

  }

  render() {
    return (
      <div className="settings">
        <div className="form">
          <div className="form__block">
            <div className="form__label">Your referral link</div>
            <div className="form__input"><InputWithCopy value="Email" /></div>
          </div>
          <div className="form__title">Social network</div>
          <div className="form__block">
            <div className="form__combine-label-input">
              <Accordeon label="Facebook" />
            </div>
          </div>
          <div className="form__block">
            <div className="form__combine-label-input">
              <Accordeon label="Twitter" />
            </div>
          </div>
          <div className="form__block">
            <div className="form__combine-label-input">
              <Accordeon label="Github" isOpened />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatch)(SettingsReferralPage);
