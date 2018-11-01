import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import TextInput from '../TextInput';
import InputErrorIcon from '../Icons/InputError';

class TradeRAMPopup extends PureComponent {
  state = {
    RAMAmount: '',
  }

  render() {
    return (
      <div className="menu-tokens-popup menu-tokens-popup_buy-ram left">
        <div className="menu-tokens-popup__title title_small"><strong>{this.props.title} Tokens</strong></div>
        <div>
          <TextInput
            label="RAM Amount, Bytes"
            placeholder="6664"
            className="menu-tokens-popup__input"
            value={this.state.RAMAmount}
            onChange={RAMAmount => this.setState({ RAMAmount })}
          />
        </div>
        <div className="menu-tokens-popup__cost">
          <div className="menu-tokens-popup__title-cost"><strong>≈ 56 UOS</strong></div>
          <div className="menu-tokens-popup__tip">RAM Cost</div>
        </div>
        <div className="menu-tokens-popup__error">
          <div className="menu-tokens-popup__error-icon"><InputErrorIcon isBig /></div>
          <div>Not enough RAM, decrease RAM amount  </div>
        </div>
        <Button
          isUpper
          isStretched
          text={this.props.title}
          size="big"
          theme="red"
        />
      </div>
    );
  }
}

TradeRAMPopup.propTypes = {
  title: PropTypes.string,
};

export default TradeRAMPopup;
