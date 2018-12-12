import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import Panel from '../Panel/Panel';
import Button from '../Button';
import { getSelectedNodes } from '../../store/governance';
import { voteForBlockProducers } from '../../actions/governance';

class GovernanceVote extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      votePanelActive: false,
    };
  }

  render() {
    return (
      <div className="governance-vote">
        <div className="content content_base">
          <div className="content__inner">
            <div className="content__title">
              <h1 className="title title_small title_medium">Submit votes for selected producers</h1>
            </div>

            {this.props.selectedNodes.length > 0 &&
              <div className="content__section">
                <div className="text">
                  <p>You will vote for this produsers:</p>
                  <div className="inline inline_small">
                    {this.props.selectedNodes.map(item => (
                      <span key={item.id} className="inline__item">
                        <strong>{item.title}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            }

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

              {this.props.governance.nodes.votePopupErrors.length > 0 &&
                <div className="governance-vote__error">
                  {this.props.governance.nodes.votePopupErrors[0].message}
                </div>
              }

              <div className="governance-vote__vote">
                <Button
                  isUpper
                  isStretched
                  size="big"
                  theme="red"
                  text="Vote"
                  isDisabled={this.props.governance.nodes.loading}
                  onClick={() => this.props.voteForBlockProducers()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    governance: state.governance,
    selectedNodes: getSelectedNodes(state),
  }),
  dispatch => bindActionCreators({
    voteForBlockProducers,
  }, dispatch),
)(GovernanceVote);
