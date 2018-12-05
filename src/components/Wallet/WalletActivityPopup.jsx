import React, { useState } from 'react';
import moment from 'moment';
import { WalletCommentIcon, WalletMinus, WalletPlus } from '../Icons/WalletIcons';

const WalletActivityPopup = (props) => {
  const [minimazed, setMinimazed] = useState(true);
  const { action, walletAvatar, ...info } = props;

  return (
    <div className="wallet-activity-popup">
      <div className="wallet-activity-popup__header">
        <div className="wallet-activity-popup__time">
          {moment(props.updatedAt).format('DD MMMM YYYY HH:mm:ss')}
        </div>
        <div className="wallet-activity-popup__type">
          {props.trType}
        </div>
      </div>

      <div className="wallet-activity-popup__info">
        {props.walletAvatar}
        <div className="wallet-activity-popup__action">
          {props.action}
        </div>
        <div className="wallet-activity-popup__amount title_small">
          <strong>{props.amount}</strong>
        </div>
      </div>
      <div className="wallet-activity-popup__footer">
        {props.memo ?
          <div className="wallet-activity-popup__memo">
            <div className="wallet-activity-popup__memo-caption">
              <WalletCommentIcon />
              <div className="wallet-activity-popup__memo-caption-text">Memo</div>
            </div>
            <div className="wallet-activity-popup__memo-text">
              {props.memo}
            </div>
          </div> : null
        }
        <div className="wallet-activity-popup__switch">
          Detailed info
          <div className="wallet-activity-popup__switcher" onClick={() => setMinimazed(!minimazed)} role="presentation">
            {minimazed ? <WalletPlus /> : <WalletMinus />}
          </div>
        </div>
        <pre>{!minimazed && JSON.stringify(info, null, 4)}</pre>
      </div>
    </div>
  );
};
export default WalletActivityPopup;
