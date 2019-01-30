import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import Button from '../Button';
import TextInput from '../TextInput';
import InputErrorIcon from '../Icons/InputError';
import { setWalletEditStakeData, stakeOrUnstakeTokens, setWalletEditStakeVisible } from '../../actions/wallet';
import Popup from '../Popup';
import ModalContent from '../ModalContent';

const SetStakePopup = (props) => {
  if (!props.wallet.editStake.visible) return null;
  return (
    <Popup onClickClose={() => props.setWalletEditStakeVisible(false)}>
      <ModalContent mod="wallet-popup" onClickClose={() => props.setWalletEditStakeVisible(false)}>
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
                disabled={props.wallet.editStake.loading}
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
                disabled={props.wallet.editStake.loading}
                value={props.wallet.editStake.data.netAmount}
                onChange={netAmount => props.setWalletEditStakeData({ netAmount })}
                error={props.wallet.editStake.errors.netAmount && props.wallet.editStake.errors.netAmount[0]}
              />
            </div>
          </div>

          <div className="tokens-popup__tip tokens-popup__tip_stake">
              Unstaking UOS from Bandwidth or CPU takes 3 days. After 3 days, you can claim your unstaked UOS.
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
      </ModalContent>
    </Popup>
  );
};
export default connect(
  state => ({
    wallet: state.wallet,
  }),
  dispatch => bindActionCreators({
    setWalletEditStakeData,
    stakeOrUnstakeTokens,
    setWalletEditStakeVisible,
  }, dispatch),
)(SetStakePopup);
