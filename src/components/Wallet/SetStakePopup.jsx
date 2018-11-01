import React, { PureComponent } from 'react';
import Button from '../Button';
import TextInput from '../TextInput';
import InputErrorIcon from '../Icons/InputError';

class SetStakePopup extends PureComponent {
  state = {
    UOSforCPUtime: '',
    UOSforNetworkBW: '',
  }

  render() {
    return (
      <div className="menu-tokens-popup menu-tokens-popup_buy-ram left">
        <div className="menu-tokens-popup__title title_small"><strong>{this.props.title} Tokens</strong></div>

        <div className="menu-tokens-popup__fields">
          <TextInput
            label="UOS for CPU Time"
            placeholder="6664"
            className="menu-tokens-popup__input"
            value={this.state.UOSforCPUtime}
            onChange={UOSforCPUtime => this.setState({ UOSforCPUtime })}
          />
          <TextInput
            label="UOS for CPU Time"
            placeholder="6664"
            className="menu-tokens-popup__input"
            value={this.state.UOSforNetworkBW}
            onChange={UOSforNetworkBW => this.setState({ UOSforNetworkBW })}
          />
        </div>

        <div className="menu-tokens-popup__tip menu-tokens-popup__tip_stake">
          Any EOS unstaked from either Bandwidth or CPU will
          be unavailable for 3 days. After this waiting period it will appear as available.
        </div>

        <div className="menu-tokens-popup__error">
          <div className="menu-tokens-popup__error-icon"><InputErrorIcon isBig /></div>
          <div>Not enough UOS </div>
        </div>

        <Button
          isUpper
          isStretched
          text="Update"
          size="big"
          theme="red"
        />
      </div>
    );
  }
}

export default SetStakePopup;
