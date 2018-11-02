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
      <div className="tokens-popup">
        <div className="tokens-popup__title">
          <h2 className="title title_small title_light">Send Tokens</h2>
        </div>

        <div className="tokens-popup__field">
          <div className="tokens-popup__input">
            <TextInput
              label="UOS Amount"
              placeholder="0"
              value={this.state.UOSAmount}
              onChange={UOSAmount => this.setState({ UOSAmount })}
            />
          </div>
        </div>
        <div className="tokens-popup__field">
          <div className="tokens-popup__input">
            <TextInput
              label="Destination Account"
              placeholder="@"
              value={this.state.destinationAccount}
              onChange={destinationAccount => this.setState({ destinationAccount })}
              isSearch
            />
          </div>
        </div>
        <div className="tokens-popup__field">
          <div className="tokens-popup__input">
            <TextInput
              label="Memo"
              placeholder="Example"
              className="tokens-popup__input"
              value={this.state.memo}
              onChange={memo => this.setState({ memo })}
            />
          </div>
        </div>

        <div className="tokens-popup__error">
          <div className="tokens-popup__error-icon"><InputErrorIcon isBig /></div>
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
