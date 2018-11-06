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
      <div className="tokens-popup tokens-popup_buy-ram">
        <div className="tokens-popup__title">
          <h2 className="title title_small title_light">{this.props.title} RAM</h2>
        </div>

        <div>
          <div className="tokens-popup__input">
            <TextInput
              label="RAM Amount, Bytes"
              placeholder="6664"
              value={this.state.RAMAmount}
              onChange={RAMAmount => this.setState({ RAMAmount })}
            />
          </div>
        </div>
        <div className="tokens-popup__cost">
          <div className="tokens-popup__title-cost"><strong>≈ 56 UOS</strong></div>
          <div className="tokens-popup__tip">RAM Cost</div>
        </div>
        <div className="tokens-popup__error">
          <div className="tokens-popup__error-icon"><InputErrorIcon isBig /></div>
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
