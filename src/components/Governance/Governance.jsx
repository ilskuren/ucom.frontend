import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { useEffect /* , useState */ } from 'react';
import GovernanceTable from './GovernanceTable';
// import Button from '../Button';
// import Panel from '../Panel';
import Popup from '../Popup';
import ModalContent from '../ModalContent';
import GovernanceVote from './GovernanceVote';
import OrganizationHead from '../Organization/OrganizationHead';
import { governanceNodesGet, governanceHideVotePopup, governanceShowVotePopup } from '../../actions/governance';
import { getOrganization } from '../../actions/organizations';
import { setWalletEditStakeVisible, getAccountState, stakeOrUnstakeTokens } from '../../actions/wallet';
import { getSelectedNodes } from '../../store/governance';
import { selectUser } from '../../store/selectors/user';
import LayoutBase from '../Layout/LayoutBase';
import { getUosGroupId } from '../../utils/config';
import SetStakePopup from '../Wallet/SetStakePopup';

const Governance = (props) => {
  const organizationId = getUosGroupId();

  useEffect(() => {
    props.getAccountState();
    props.getOrganization(organizationId);
    props.governanceNodesGet();
    props.stakeOrUnstakeTokens();
  }, [organizationId]);

  // const [selectedPanelActive, setSelectedPanelActive] = useState(false);
  return (
    <LayoutBase>
      {props.governance.nodes.votePopupVisibile &&
        <Popup onClickClose={() => props.governanceHideVotePopup()}>
          <ModalContent mod="governance-vote">
            <GovernanceVote />
          </ModalContent>
        </Popup>
      }
      {props.wallet.editStake.visible && (
        <Popup onClickClose={() => props.setWalletEditStakeVisible(false)}>
          <ModalContent mod="wallet-popup" onClickClose={() => props.setWalletEditStakeVisible(false)}>
            <SetStakePopup />
          </ModalContent>
        </Popup>
      )}
      <div className="governance">
        <div className="content content_base">
          <div className="content__inner">
            <div className="content__title">
              <h1 className="title">Governance</h1>
            </div>

            <div className="governance__section">
              <div className="governance__text">
                Govern the U°OS protocol through voting. You can currently vote for active and standby Block Producers. Vote with your staked UOS.
              </div>
              <div className="governance__status">
                <div className="governance__edit-stake">
                  <span className="governance__status-text">Staked</span>
                  <h3 className="title_small">
                    {props.wallet.state.data.tokens && props.wallet.state.data.tokens.staked}
                  </h3>
                  <span className="governance__status-text">UOS</span>
                </div>
                <div
                  className="governance__action"
                  role="presentation"
                  onClick={() => props.setWalletEditStakeVisible(true)}
                >
                  Edit Stake
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="content__inner">
          <div className="sheets">
            <div className="sheets__list">
              <div className="sheets__item">
                <OrganizationHead organizationId={organizationId} />
              </div>
            </div>

            <div className="sheets__content sheets__content_theme_governance">
              {/* {props.user.id &&
                <div className="content__section content__section_small">
                  <Panel
                    title={`Selected (${props.selectedNodes.length})`}
                    active={selectedPanelActive}
                    onClickToggler={() => setSelectedPanelActive(!selectedPanelActive)}
                  >
                    <div className="governance-selected">
                      <div className="governance-selected__table">
                        <GovernanceTable data={props.selectedNodes} />
                      </div>
                      <div className="governance-selected__actions">
                        <div className="governance-selected__vote">
                          <Button
                            isStretched
                            size="small"
                            theme="red"
                            text="Vote"
                            isDisabled={props.governance.nodes.loading}
                            onClick={() => props.governanceShowVotePopup()}
                          />
                        </div>
                      </div>
                    </div>
                  </Panel>
                </div>
              } */}

              {props.governance.nodes.data.length > 0 &&
                <div className="content__section content__section_small">
                  <div className="governance-all">
                    <div className="governance-all__title">
                      <h2 className="title title_bold">Block Producers </h2>
                    </div>
                    <div className="governance__text governance__text_description">
                    The Block Producers are decentralized entities that keep the chain running by producing blocks. The Block Producers are elected through voting.
                    </div>
                    <div className="governance-all__table">
                      <GovernanceTable
                        data={props.governance.nodes.data}
                        isPreview
                      />
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

export default connect(
  state => ({
    user: selectUser(state),
    governance: state.governance,
    wallet: state.wallet,
    selectedNodes: getSelectedNodes(state),
  }),
  dispatch => bindActionCreators({
    governanceNodesGet,
    governanceHideVotePopup,
    governanceShowVotePopup,
    getOrganization,
    setWalletEditStakeVisible,
    getAccountState,
    stakeOrUnstakeTokens,
  }, dispatch),
)(Governance);
