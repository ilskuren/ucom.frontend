import React from 'react';
import Avatar from './Avatar';

const MenuWallet = () => (
  <div className="menu-wallet left">
    <div className="menu-wallet__block menu-wallet__block_tokens">
      <h2 className="menu-wallet__title">Tokens</h2>
      <div className="menu-wallet__content">
        <div className="inline__item menu-wallet__item">
          <div className="menu-wallet__amount">3200</div>
          <div className="menu-wallet__status">Active, UOS</div>
          <div className="menu-wallet__action">Send</div>
        </div>
        <div className="inline__item menu-wallet__item">
          <div className="menu-wallet__amount">3000</div>
          <div className="menu-wallet__status">Stacked, UOS</div>
          <div className="menu-wallet__action">Edit Stake</div>
        </div>
        <div className="inline__item menu-wallet__item">
          <div className="menu-wallet__amount">0.000000001</div>
          <div className="menu-wallet__status">Emission, UOS</div>
          <div className="menu-wallet__action">Get Emission</div>
        </div>
      </div>
    </div>
    <div className="menu-wallet__block menu-wallet__block_resources">
      <h2 className="menu-wallet__title">Resources</h2>
      <div className="menu-wallet__content">
        <div className="inline__item menu-wallet__item">
          <div className="menu-wallet__amount">
            <span>0.05kB Free</span>
            <span className="menu-wallet__whole-amount">5.47kB</span>
          </div>
          <div className="progrees-bar">
            <div className="progrees-bar__filler" />
          </div>
          <div className="menu-wallet__status">RAM</div>
          <div>
            <div className="inline__item menu-wallet__action menu-wallet__action_buy">Buy</div>
            <div className="inline__item menu-wallet__action">Sell</div>
          </div>
        </div>
        <div className="inline__item menu-wallet__item">
          <div className="menu-wallet__amount">
            <span>0.0004 sec</span>
            <span className="menu-wallet__whole-amount">0.0034 sec</span>
          </div>
          <div className="progrees-bar">
            <div className="progrees-bar__filler" />
          </div>
          <div className="menu-wallet__status">CPU Time</div>
          <div className="menu-wallet__action">Edit Stake</div>
        </div>
        <div className="inline__item menu-wallet__item">
          <div className="menu-wallet__amount">
            <span>0.05kB Free</span>
            <span className="menu-wallet__whole-amount">5.47kB</span>
          </div>
          <div className="progrees-bar">
            <div className="progrees-bar__filler" />
          </div>
          <div className="menu-wallet__status">Network BW</div>
          <div className="menu-wallet__action">Edit Stake</div>
        </div>
      </div>
    </div>
    <div className="menu-wallet__block menu-wallet__block_resources">
      <h2 className="menu-wallet__title">Activity</h2>
      <div className="table-content">
        <div className="table-content__table">
          <table className="menu-table menu-table_responsive">
            <thead className="menu-table__head">
              <tr className="menu-table__row">
                <td className="menu-table__cell">Received account</td>
                <td className="menu-table__cell">Tx hash</td>
                <td className="menu-table__cell">Block</td>
                <td className="menu-table__cell">Amount, UOS</td>
                <td className="menu-table__cell" />
              </tr>
            </thead>
            <tbody className="menu-table__body">
              {new Array(5).join('.').split('.').map((_, i) => (
                <tr key={i} className="menu-table__row menu-table__row_first-row">
                  <td className="menu-table__cell" data-title="Received account">
                    <div className="menu-wallet__account-card">
                      <Avatar size="xmsmall" />
                      <span className="bold">@cryptoplant</span>
                    </div>
                  </td>
                  <td className="menu-table__cell" data-title="Tx hash">177oEJ4****32eyOK213</td>
                  <td className="menu-table__cell" data-title="Block">7764342</td>
                  <td className="bold menu-table__cell" data-title="Amount, UOS">
                    <span className="bold">0.32424</span>
                  </td>
                  <td className="menu-table__cell" data-title="">
                  12/24/2018, 1:08:03 PM
                  </td>
                </tr>
                ))}
            </tbody>
          </table>
          <div className="table-content__showmore">
            <button
              className="button-clean button-clean_link"
              onClick={() => this.loadMore()}
            >
              Show More
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MenuWallet;
