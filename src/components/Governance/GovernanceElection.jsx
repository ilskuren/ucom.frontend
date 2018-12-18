import React, { useState } from 'react';
import GovernanceTable from './GovernanceTable';
import Button from '../Button';

const GovernanceElection = (props) => {
  const [route, setRoute] = useState(1);

  return (
    <div className="governance governance-election">
      <div className="content content_base">
        <div className="content__inner">
          <div className="content__title">
            <h1 className="title">Block Producers Election</h1>
          </div>
          <div className="governance-election__grid">
            <div className="governance-election__grid-item">
              <div className="title title_small title_bold">{props.stakedTokens}</div>
              <div className="governance-election__status-text">You’re voting with your Stake.</div>
            </div>
            <div className="governance-election__grid-item">
              <div className="title title_small title_bold">30</div>
              <div className="governance-election__status-text">Vote for a maximum of 30 Block Producers.</div>
            </div>
            <div className="governance-election__grid-item">
              <div className="title title_small title_bold">Trust</div>
              <div className="governance-election__status-text">You extend your trust to a Block Producer through voting.</div>
            </div>
            <div className="governance-election__grid-item">
              <div className="title title_small title_bold">BP Rank</div>
              <div className="governance-election__status-text">The rank of each Block Producer is affected by the amount of your Stake.</div>
            </div>
            <div className="governance-election__grid-item">
              <div className="title title_small title_bold">63 Seconds</div>
              <div className="governance-election__status-text">Your vote is exercised each round of 63 seconds.</div>
            </div>
            <div className="governance-election__grid-item">
              <div className="title title_small title_bold">1 Round</div>
              <div className="governance-election__status-text">You can change your vote on each round.</div>
            </div>
          </div>

          <div className="governance-election__nav-bar">
            <div className="toolbar toolbar_responsive">
              <div className="toolbar__main">
                <div className="menu menu_simple-tabs">
                  <div className="menu__item_narrow">
                    <div
                      className={`menu__link title title_small ${route === 1 ? 'menu__link_active' : ''}`}
                      onClick={() => setRoute(1)}
                      role="presentation"
                    >
                       Select Block Producers
                    </div>
                  </div>
                  <div className="menu__item_narrow">
                    <div
                      className={`menu__link title title_small ${route === 2 ? 'menu__link_active' : ''}`}
                      onClick={() => setRoute(2)}
                      role="presentation"
                    >
                      {props.selectedNodes.length} Selected
                    </div>
                  </div>
                  <div className="menu__item_narrow menu__item_left">
                    <Button
                      theme="red-white"
                      text="Cast your vote"
                      onClick={() => props.setConfirmationVisibility(true)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="governance-all__table">
            {route === 1 ?
              <GovernanceTable
                data={props.table}
              /> : null
            }
            {route === 2 ?
              <GovernanceTable
                data={props.selectedNodes}
              /> : null
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernanceElection;

