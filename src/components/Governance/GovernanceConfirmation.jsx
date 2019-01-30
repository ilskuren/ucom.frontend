import React, { useState, useEffect } from 'react';
import GovernanceTable from './GovernanceTable';
import Button from '../Button';
import Avatar from '../Avatar';
import { IconOK, IconNo } from '../Icons/GovernanceIcons';
import { getFileUrl } from '../../utils/upload';
import Panel from '../Panel/Panel';

const GovernanceConfirmation = (props) => {
  const [idList, setListId] = useState([]);
  const [panelActive, setPanelActive] = useState(false);

  useEffect(() => {
    setListId(props.selectedNodes.map(e => e.id));
  }, []);

  const list = props.table.filter(i => idList.includes(i.id));
  const currentIdList = props.selectedNodes.map(e => e.id);
  const listToVote = list.filter(i => currentIdList.includes(i.id));
  const listToUnvote = list.filter(i => !currentIdList.includes(i.id));
  const listToText = listToVote.map(e => e.title);
  return (
    <div className="governance governance-election governance-confirmation">
      <div className="content content_base content_base_low">
        <div className="content__inner">
          <div className="content__title_tall">
            <h1 className="title">Vote for these producers</h1>
          </div>
          <div className="governance-vote-title">
            <div className="governance-confirmation-avatar">
              <Avatar src={getFileUrl(props.user.avatarFilename)} size="xsmall" icon={<IconOK />} />
            </div>
            <div className="title title_xxsmall title_bold">Block Producers to Vote </div>
          </div>
          <div className="governance-all__table governance-all__table_margin">
            <GovernanceTable
              data={listToVote}
            />
          </div>

          <div className="governance-vote-title">
            <div className="governance-confirmation-avatar">
              <Avatar src={getFileUrl(props.user.avatarFilename)} size="xsmall" icon={<IconNo />} />
            </div>
            <div className="title title_xxsmall title_bold">Block Producers to Unvote </div>
          </div>
          <div className="governance-all__table governance-all__table_margin_low">
            <GovernanceTable
              data={listToUnvote}
            />
          </div>
          <div className="governance-vote__panel">
            <Panel
              title="By completing this transaction, I agree to the following..."
              active={panelActive}
              onClickToggler={() => setPanelActive(!panelActive)}
            >
              <div className="governance-vote__text">
                <div className="text">
                  <p>The intent of the ‘voteproducer’ action is to cast a valid vote for up to 30 BP candidates.</p>
                  <p>As an authorized party I {props.user.firstName} wish to vote on behalf of {props.user.firstName} in favor of the block produser candidates
                    {listToText.length ? listToText.map((i, index) => (<span key={index}><strong> {i}</strong>{listToText.length === index - 2 ? '' : ','} </span>)) : <strong> None </strong>}
                    with a voting weight equal to all tokens currently owned by {props.user.firstName} and staked for CPU or bandwidth.
                  </p>
                  <p>If I am not the benefitial owner of these shares I stipulate I have proof that I’ve been authorized to vote these shares by their benefitial owner(s).</p>
                  <p>I stipulate I have not and will not accept anything of value in exchange for these votes, on penalty of confiscation of these tokens, and other penalties.</p>
                  <p>I acknowledge that using any system of authomatic voting, re-voting, or vote refreshing, or allowing such system to be used on my behalf or on behalf of another, is forbidden and doing so violates this contract.</p>
                </div>
              </div>
            </Panel>
          </div>
          <div className="governance-button-tall governance-button_center">
            <Button
              isUpper
              isStretched
              text="Vote"
              size="big"
              theme="red"
              onClick={props.setVotes}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernanceConfirmation;
