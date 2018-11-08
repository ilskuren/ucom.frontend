import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import Button from '../Button';
import TextInput from '../TextInput';
import InputErrorIcon from '../Icons/InputError';
import { setWalletEditStakeData, stakeOrUnstakeTokens } from '../../actions/wallet';

const SetStakePopup = props => (
  <div className="tokens-popup">
    <div className="tokens-popup__title">
      <h2 className="title title_small title_light">Set Stake</h2>
    </div>
    <div className="tokens-popup__fields">
      <div className="tokens-popup__input">
        <TextInput
          touched
          label="UOS for CPU Time"
          placeholder="6664"
          value={props.wallet.editStake.data.cpuAmount}
          onChange={cpuAmount => props.setWalletEditStakeData({ cpuAmount })}
          error={props.wallet.editStake.errors.cpuAmount && props.wallet.editStake.errors.cpuAmount[0]}
        />
      </div>
      <div className="tokens-popup__input">
        <TextInput
          touched
          label="UOS for Network BW"
          placeholder="6664"
          value={props.wallet.editStake.data.netAmount}
          onChange={netAmount => props.setWalletEditStakeData({ netAmount })}
          error={props.wallet.editStake.errors.netAmount && props.wallet.editStake.errors.netAmount[0]}
        />
      </div>
    </div>

    <div className="tokens-popup__tip tokens-popup__tip_stake">
      Any EOS unstaked from either Bandwidth or CPU will
      be unavailable for 3 days. After this waiting period it will appear as available.
    </div>

    {props.wallet.editStake.serverErrors.length > 0 &&
      <div className="tokens-popup__error">
        <div className="tokens-popup__error-icon"><InputErrorIcon isBig /></div>
        <div>{props.wallet.editStake.serverErrors[0].message}</div>
      </div>
    }

    <Button
      isUpper
      isStretched
      text="Update"
      size="big"
      theme="red"
      isDisabled={!props.wallet.editStake.isValid || props.wallet.editStake.loading}
      onClick={() => props.stakeOrUnstakeTokens()}
    />
  </div>
);

export default connect(
  state => ({
    wallet: state.wallet,
  }),
  dispatch => bindActionCreators({
    setWalletEditStakeData,
    stakeOrUnstakeTokens,
  }, dispatch),
)(SetStakePopup);
