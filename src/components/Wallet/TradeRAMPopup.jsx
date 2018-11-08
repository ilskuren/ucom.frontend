import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
// import PropTypes from 'prop-types';
import Button from '../Button';
import TextInput from '../TextInput';
import InputErrorIcon from '../Icons/InputError';
import { setWalletTradeRamDataAndGetPrice, tradeRam } from '../../actions/wallet';

const TradeRAMPopup = props => (
  <div className="tokens-popup tokens-popup_buy-ram">
    <div className="tokens-popup__title">
      <h2 className="title title_small title_light">{props.wallet.tradeRam.isBuy ? 'Buy' : 'Sell'} RAM</h2>
    </div>

    <div className="tokens-popup__field">
      <div className="tokens-popup__input">
        <TextInput
          touched
          label="RAM Amount, Bytes"
          placeholder="6664"
          value={props.wallet.tradeRam.data.bytesAmount}
          onChange={bytesAmount => props.setWalletTradeRamDataAndGetPrice({ bytesAmount })}
          error={props.wallet.tradeRam.errors.bytesAmount && props.wallet.tradeRam.errors.bytesAmount[0]}
        />
      </div>
    </div>

    {Number(props.wallet.tradeRam.data.price) > 0 &&
      <div className="tokens-popup__cost">
        <div className="tokens-popup__title-cost"><strong>≈ {props.wallet.tradeRam.data.price} UOS</strong></div>
        <div className="tokens-popup__tip">RAM Cost</div>
      </div>
    }

    {props.wallet.tradeRam.serverErrors.length > 0 &&
      <div className="tokens-popup__error">
        <div className="tokens-popup__error-icon"><InputErrorIcon isBig /></div>
        <div>{props.wallet.tradeRam.serverErrors[0].message}</div>
      </div>
    }

    <Button
      isUpper
      isStretched
      size="big"
      theme="red"
      text={props.wallet.tradeRam.isBuy ? 'Buy' : 'Sell'}
      isDisabled={!props.wallet.tradeRam.isValid || props.wallet.tradeRam.loading}
      onClick={() => props.tradeRam(props.wallet.tradeRam.isBuy)}
    />
  </div>
);

TradeRAMPopup.propTypes = {

};

export default connect(
  state => ({
    wallet: state.wallet,
  }),
  dispatch => bindActionCreators({
    setWalletTradeRamDataAndGetPrice,
    tradeRam,
  }, dispatch),
)(TradeRAMPopup);
