import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import GovernanceTable from './GovernanceTable';
import Button from '../Button';
import Panel from '../Panel';
import Popup from '../Popup';
import ModalContent from '../ModalContent';
import GovernanceVote from './GovernanceVote';
import { governanceNodesGet, governanceHideVotePopup, governanceShowVotePopup } from '../../actions/governance';
import { getSelectedNodes } from '../../store/governance';
import { selectUser } from '../../store/selectors/user';
import LayoutBase from '../Layout/LayoutBase';

class Governance extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedPanelActive: false,
    };
  }

  componentDidMount() {
    this.props.governanceNodesGet();
  }

  render() {
    return (
      <LayoutBase>
        {this.props.governance.nodes.votePopupVisibile &&
          <Popup onClickClose={() => this.props.governanceHideVotePopup()}>
            <ModalContent mod="governance-vote">
              <GovernanceVote />
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

            {this.props.user.id &&
              <div className="content__section content__section_small">
                <Panel
                  title={`Selected (${this.props.selectedNodes.length})`}
                  active={this.state.selectedPanelActive}
                  onClickToggler={() => this.setState({ selectedPanelActive: !this.state.selectedPanelActive })}
                >
                  <div className="governance-selected">
                    <div className="governance-selected__table">
                      <GovernanceTable data={this.props.selectedNodes} />
                    </div>
                    <div className="governance-selected__actions">
                      <div className="governance-selected__vote">
                        <Button
                          isStretched
                          size="small"
                          theme="red"
                          text="Vote"
                          isDisabled={this.props.governance.nodes.loading}
                          onClick={() => this.props.governanceShowVotePopup()}
                        />
                      </div>
                    </div>
                  </div>
                </Panel>
              </div>
            }

            {this.props.governance.nodes.data.length > 0 &&
              <div className="content__section content__section_small">
                <div className="governance-all">
                  <div className="governance-all__title">
                    <h2 className="title title_small">All BP</h2>
                  </div>
                  <div className="governance-all__table">
                    <GovernanceTable
                      data={this.props.governance.nodes.data}
                    />
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </LayoutBase>
    );
  }
}

export default connect(
  state => ({
    user: selectUser(state),
    governance: state.governance,
    selectedNodes: getSelectedNodes(state),
  }),
  dispatch => bindActionCreators({
    governanceNodesGet,
    governanceHideVotePopup,
    governanceShowVotePopup,
  }, dispatch),
)(Governance);
