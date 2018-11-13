import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import Button from '../Button';
import TextInput from '../TextInput';
import InputErrorIcon from '../Icons/InputError';
import UserSearchInput from '../UserSearchInput';
import { setWalletSendTokensData, sendTokens } from '../../actions/wallet';
import api from '../../api';
import { selectUser } from '../../store/selectors/user';

const SendTokensPopup = props => (
  <div className="tokens-popup">
    <div className="tokens-popup__title">
      <h2 className="title title_small title_light">Send Tokens</h2>
    </div>

    <div className="tokens-popup__field">
      <div className="tokens-popup__input">
        <TextInput
          touched
          label="UOS Amount"
          placeholder="0"
          value={props.wallet.sendTokens.data.amount}
          onChange={amount => props.setWalletSendTokensData({ amount })}
          error={props.wallet.sendTokens.errors.amount && props.wallet.sendTokens.errors.amount[0]}
        />
      </div>
    </div>

    <div className="tokens-popup__field">
      <div className="tokens-popup__input">
        <div className="tokens-popup__label">Destination Account</div>
        <UserSearchInput
          isMulti={false}
          loadOptions={q =>
            api.searchUsers(q)
            .then((data) => {
              const arr = data.filter(item => item.id !== props.user.id);
              return arr;
            })
          }
          value={props.wallet.sendTokens.data.user ? props.wallet.sendTokens.data.user : null}
          onChange={user => props.setWalletSendTokensData({ user: user.accountName ? user : null })}
        />
        {props.wallet.sendTokens.errors.user &&
          <div className="tokens-popup__field-error">{props.wallet.sendTokens.errors.user[0]}</div>
        }
      </div>
    </div>

    <div className="tokens-popup__field">
      <div className="tokens-popup__input">
        <TextInput
          label="Memo"
          placeholder="Example"
          className="tokens-popup__input"
          value={props.wallet.sendTokens.data.memo}
          onChange={memo => props.setWalletSendTokensData({ memo })}
          error={props.wallet.sendTokens.errors.memo && props.wallet.sendTokens.errors.memo[0]}
        />
      </div>
    </div>

    {props.wallet.sendTokens.serverErrors.length > 0 &&
      <div className="tokens-popup__error">
        <div className="tokens-popup__error-icon"><InputErrorIcon isBig /></div>
        <div>{props.wallet.sendTokens.serverErrors[0].message}</div>
      </div>
    }

    <Button
      isUpper
      isStretched
      text="Send"
      size="big"
      theme="red"
      isDisabled={!props.wallet.sendTokens.isValid || props.wallet.sendTokens.loading}
      onClick={() => props.sendTokens()}
    />
  </div>
);

export default connect(
  state => ({
    wallet: state.wallet,
    users: state.users,
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    setWalletSendTokensData,
    sendTokens,
  }, dispatch),
)(SendTokensPopup);
