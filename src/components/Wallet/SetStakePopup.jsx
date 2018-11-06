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
      <div className="tokens-popup">
        <div className="tokens-popup__title">
          <h2 className="title title_small title_light">Set Stake</h2>
        </div>
        <div className="tokens-popup__fields">
          <div className="tokens-popup__input">
            <TextInput
              label="UOS for CPU Time"
              placeholder="6664"
              value={this.state.UOSforCPUtime}
              onChange={UOSforCPUtime => this.setState({ UOSforCPUtime })}
            />
          </div>
          <div className="tokens-popup__input">
            <TextInput
              label="UOS for CPU Time"
              placeholder="6664"
              value={this.state.UOSforNetworkBW}
              onChange={UOSforNetworkBW => this.setState({ UOSforNetworkBW })}
            />
          </div>
        </div>

        <div className="tokens-popup__tip tokens-popup__tip_stake">
          Any EOS unstaked from either Bandwidth or CPU will
          be unavailable for 3 days. After this waiting period it will appear as available.
        </div>

        <div className="tokens-popup__error">
          <div className="tokens-popup__error-icon"><InputErrorIcon isBig /></div>
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
