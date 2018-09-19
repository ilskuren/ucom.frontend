import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { bind } from 'decko';
import * as selectors from 'utils/redux/selectors/settings';
import PropTypes from 'prop-types';
import Switcher from '../../components/Switcher';

import * as actions from '../../actions/settings';

const mapDispatch = dispatch =>
  bindActionCreators({
    setSettingsSecurityData: actions.setSettingsSecurityData,
    resetSettingsSecurity: actions.resetSettingsSecurity,
  }, dispatch);


const mapStateToProps = state => ({
  security: selectors.selectSettingsSecurity(state),
});

class SettingsSecurityPage extends PureComponent {
  componentDidMount() {

  }

  @bind
  makeHandleCheckBoxToggle(item) {
    return checkValue => this.props.setSettingsSecurityData({ item, checkValue });
  }

  render() {
    const { autoLogin, twoFa } = this.props.security.data;
    return (
      <div className="settings">
        <div className="form">
          <div className="form__block">
            <div className="form__label">Auto-login</div>
            <div className="form__input">
              <Switcher
                onChange={this.makeHandleCheckBoxToggle('autoLogin')}
                isChecked={autoLogin}
              />
            </div>
          </div>
          <div className="form__block">
            <div className="form__label">2FA</div>
            <div className="form__input">
              <Switcher
                onChange={this.makeHandleCheckBoxToggle('twoFa')}
                isChecked={twoFa}
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
  security: PropTypes.shape({
    data: PropTypes.shape({
      autoLogin: PropTypes.bool,
      twoFa: PropTypes.bool,
    }),
  }),
};

export default connect(mapStateToProps, mapDispatch)(SettingsSecurityPage);
