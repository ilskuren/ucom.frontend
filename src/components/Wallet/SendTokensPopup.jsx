import React, { PureComponent } from 'react';
import Button from '../Button';
import TextInput from '../TextInput';
import InputErrorIcon from '../Icons/InputError';

class SendTokensPopup extends PureComponent {
  state = {
    UOSAmount: '',
    destinationAccount: '',
    memo: '',
  }

  render() {
    return (
      <div className="menu-tokens-popup left">
        <div className="menu-tokens-popup__title title_small"><strong>Send Tokens</strong></div>
        <div className="menu-tokens-popup__field">
          <TextInput
            label="UOS Amount"
            placeholder="0"
            className="menu-tokens-popup__input"
            value={this.state.UOSAmount}
            onChange={UOSAmount => this.setState({ UOSAmount })}
          />
        </div>
        <div className="menu-tokens-popup__field menu-tokens-popup__field_destination-account">
          <TextInput
            label="Destination Account"
            placeholder="@"
            className="menu-tokens-popup__input"
            value={this.state.destinationAccount}
            onChange={destinationAccount => this.setState({ destinationAccount })}
            isSearch
          />
        </div>
        <div className="menu-tokens-popup__field">
          <TextInput
            label="Memo"
            placeholder="Example"
            className="menu-tokens-popup__input"
            value={this.state.memo}
            onChange={memo => this.setState({ memo })}
          />
        </div>

        <div className="menu-tokens-popup__error">
          <div className="menu-tokens-popup__error-icon"><InputErrorIcon /></div>
          <div>Destination account doesn’t exist, check spelling</div>
        </div>
        <Button
          isUpper
          isStretched
          text="Send"
          size="big"
          theme="red"
        />
      </div>
    );
  }
}
export default SendTokensPopup;
