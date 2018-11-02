import React, { Fragment, PureComponent } from 'react';
import SendTokensPopup from './SendTokensPopup';
import TradeRAMPopup from './TradeRAMPopup';
import SetStakePopup from './SetStakePopup';
import Popup from '../Popup';
import ProgressBar from './ProgressBar';

class MenuWallet extends PureComponent {
  state = {
    sendTokensVisibility: false,
    buyRAMVisibility: false,
    sellRAMVisibility: false,
    setStakeVisibility: false,
  }

  hidePopups = () => {
    this.setState({
      sendTokensVisibility: false,
      buyRAMVisibility: false,
      sellRAMVisibility: false,
      setStakeVisibility: false,
    });
  }

  render() {
    return (
      <Fragment>
        <div className="menu-wallet">
          <div className="menu-wallet__block">
            <h2 className="menu-wallet__title">Tokens</h2>

            <div className="inline inline_flex inline_large inline_resp">
              <div className="inline__item">
                <div className="menu-wallet__amount">3200</div>
                <div className="menu-wallet__status">Active, UOS</div>
                <div
                  role="presentation"
                  onClick={() => this.setState({ sendTokensVisibility: true })}
                  className="menu-wallet__action"
                >
                  Send
                </div>
              </div>

              <div className="inline__item">
                <div className="menu-wallet__amount">3000</div>
                <div className="menu-wallet__status">Stacked, UOS</div>
                <div
                  className="menu-wallet__action"
                  role="presentation"
                  onClick={() => this.setState({ setStakeVisibility: true })}
                >
                  Edit Stake
                </div>
              </div>

              <div className="inline__item">
                <div className="menu-wallet__amount">0.000000001</div>
                <div className="menu-wallet__status">Emission, UOS</div>
                <div className="menu-wallet__action">Get Emission</div>
              </div>
            </div>
          </div>

          <div className="menu-wallet__block">
            <h2 className="menu-wallet__title">Resources</h2>

            <div className="inline inline_flex inline_large inline_resp">
              <div className="inline__item">
                <ProgressBar
                  partAmount={0.05}
                  fullAmount={5.47}
                  title="RAM"
                  label="kB"
                  description="Free"
                />
                <div className="inline">
                  <div className="inline__item">
                    <div
                      role="presentation"
                      onClick={() => this.setState({ buyRAMVisibility: true })}
                      className="menu-wallet__action"
                    >
                      Buy
                    </div>
                  </div>
                  <div className="inline__item">
                    <div
                      role="presentation"
                      className="menu-wallet__action"
                      onClick={() => this.setState({ sellRAMVisibility: true })}
                    >
                      Sell
                    </div>
                  </div>
                </div>
              </div>

              <div className="inline__item">
                <ProgressBar
                  partAmount={0.0004}
                  fullAmount={0.0034}
                  title="CPU Time"
                  label="sec"
                />
                <div
                  className="menu-wallet__action"
                  role="presentation"
                  onClick={() => this.setState({ setStakeVisibility: true })}
                >
                Edit Stake
                </div>
              </div>

              <div className="inline__item">
                <ProgressBar
                  partAmount={0.5}
                  fullAmount={5.47}
                  title="Network BW"
                  label="kB"
                />
                <div
                  className="menu-wallet__action"
                  role="presentation"
                  onClick={() => this.setState({ setStakeVisibility: true })}
                >Edit Stake
                </div>
              </div>
            </div>
          </div>

          {/* <div className="menu-wallet__block menu-wallet__block_resources">
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
                            <strong>@cryptoplant</strong>
                          </div>
                        </td>
                        <td className="menu-table__cell" data-title="Tx hash">177oEJ4****32eyOK213</td>
                        <td className="menu-table__cell" data-title="Block">7764342</td>
                        <td className="bold menu-table__cell" data-title="Amount, UOS">
                          <strong>0.32424</strong>
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
          </div> */}
        </div>
        {this.state.sendTokensVisibility && (
          <Popup onClickClose={this.hidePopups}>
            <SendTokensPopup />
          </Popup>
        )}
        {this.state.buyRAMVisibility && (
          <Popup onClickClose={this.hidePopups}>
            <TradeRAMPopup title="Buy" />
          </Popup>
        )}
        {this.state.sellRAMVisibility && (
          <Popup onClickClose={this.hidePopups}>
            <TradeRAMPopup title="Sell" />
          </Popup>
        )}
        {this.state.setStakeVisibility && (
          <Popup onClickClose={this.hidePopups}>
            <SetStakePopup />
          </Popup>
        )}
      </Fragment>
    );
  }
}
export default MenuWallet;
