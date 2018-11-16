import React, { PureComponent, Fragment } from 'react';
import GovernanceTable from './GovernanceTable';
import Button from '../Button';
import Panel from '../Panel';
import Popup from '../Popup';
import ModalContent from '../ModalContent';

class Governance extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedPanelActive: false,
      votePanelActive: false,
      votePopupVisibile: false,
    };
  }

  render() {
    return (
      <Fragment>
        {this.state.votePopupVisibile &&
          <Popup onClickClose={() => this.setState({ votePopupVisibile: false })}>
            <ModalContent mod="governance-vote">
              <div className="content content_base">
                <div className="content__inner">
                  <div className="content__title">
                    <h1 className="title title_small title_medium">Submit votes for selected producers</h1>
                  </div>

                  <div className="content__section">
                    <div className="text">
                      <p>You will vote for this produsers:</p>
                      <p><strong>abcd1234www</strong> <strong>abcd1234www</strong> <strong>abcd1234www</strong></p>
                    </div>
                  </div>

                  <div className="content__section">
                    <div className="governance-vote__panel">
                      <Panel
                        title="By completing this transaction, I agree to the following..."
                        active={this.state.votePanelActive}
                        onClickToggler={() => this.setState({ votePanelActive: !this.state.votePanelActive })}
                      >
                        <div className="governance-vote__text">
                          <div className="text">
                            <p>The intent of the ‘voteproducer’ action is to cast a valid vote for up to 30 BP candidates.</p>
                            <p>As an authorized party I %username% wish to vote on behalf of %username% in favor of the block produser candidates ‘abc1234www’, ‘abc1234www’ with a voting weight equal to all tokens currently owned by %username% and staked for CPU or bandwidth.</p>
                            <p>If I am not the benefitial owner of these shares I stipulate I have proof that I’ve been authorized to vote these shares by their benefitial owner(s).</p>
                            <p>I stipulate I have not and will not accept anything of value in exchange for these votes, on penalty of confiscation of these tokens, and other penalties.</p>
                            <p>I acknowledge that using any system of authomatic voting, re-voting, or vote refreshing, or allowing such system to be used on my behalf or on behalf of another, is forbidden and doing so violates this contract.</p>
                          </div>
                        </div>
                      </Panel>
                    </div>
                    <div className="governance-vote__vote">
                      <Button
                        isUpper
                        isStretched
                        size="big"
                        theme="red"
                        text="Vote"
                        onClick={() => this.setState({ votePopupVisibile: false })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ModalContent>
          </Popup>
        }

        <div className="content content_base">
          <div className="content__inner">
            <div className="content__title">
              <h1 className="title">Governance</h1>
            </div>

            <div className="content__section">
              <div className="text">
                <p>You are able to influence the running of the community and blockchain  by voting for the Block Producers and Proxies. Choose whoever you want and click “Vote”. </p>
              </div>
            </div>

            <div className="content__section content__section_small">
              <Panel
                title="Selected (4)"
                active={this.state.selectedPanelActive}
                onClickToggler={() => this.setState({ selectedPanelActive: !this.state.selectedPanelActive })}
              >
                <div className="governance-selected governance-selected_in-panel">
                  <div className="governance-selected__table">
                    <GovernanceTable />
                  </div>
                  <div className="governance-selected__actions">
                    <div className="governance-selected__vote">
                      <Button
                        isStretched
                        size="small"
                        theme="red"
                        text="Vote"
                        onClick={() => this.setState({ votePopupVisibile: true })}
                      />
                    </div>
                  </div>
                </div>
              </Panel>
            </div>

            <div className="content__section content__section_small">
              <GovernanceTable />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Governance;
