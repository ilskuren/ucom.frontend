import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import React from 'react';
import Checkbox from '../Checkbox';
import Avatar from '../Avatar';
import { IconOK } from '../Icons/GovernanceIcons';
// import IconTableTriangle from '../Icons/TableTriangle';
import { getBpStatusById, BP_STATUS_ACTIVE_ID } from '../../utils/nodes';
import { getFileUrl } from '../../utils/upload';
import { selectUser } from '../../store/selectors/user';
import { governanceNodesSetVote } from '../../actions/governance';

const GovernanceTable = props => (
  <table className="governance-table">
    <thead className="governance-table__head">
      <tr className="governance-table__row">
        {props.user.id &&
          <td className="governance-table__cell governance-table__cell_id" />
        }
        {/* <td className="governance-table__cell governance-table__cell_name governance-table__cell_sortable"> */}
        <td className="governance-table__cell governance-table__cell_name">
          <span className="inline inline_small">
            <span className="inline__item">Organization</span>
            {/* <span className="inline__item"><IconTableTriangle /></span> */}
          </span>
        </td>
        <td className="governance-table__cell governance-table__cell_votes">Votes</td>
        <td className="governance-table__cell governance-table__cell_amount">Vote Amount, UOS</td>
        <td className="governance-table__cell governance-table__cell_state">State</td>
      </tr>
    </thead>
    <tbody className="governance-table__body">
      {props.data.map(item => (
        <tr className="governance-table__row" key={item.id}>
          {props.user.id && props.isPreview && item.myselfData && item.myselfData.bpVote ?
            <td className="governance-table__cell governance-table__cell_avatar" data-name="">
              <Avatar src={getFileUrl(props.user.avatarFilename)} size="xsmall" icon={<IconOK />} />
            </td>
            : props.user.id && !props.isPreview ?
              <td className="governance-table__cell governance-table__cell_id" data-name="">
                <div className="governance-table-checkbox">
                  <div className="governance-table-checkbox__input">
                    <Checkbox
                      isChecked={Boolean(item.myselfData && item.myselfData.bpVote)}
                      isDisabled={!item.myselfData.bpVote && props.data.filter(i => i.myselfData.bpVote).length >= 3}
                      onChange={() => {
                        if (item.myselfData) {
                          props.governanceNodesSetVote({ id: item.id, vote: !item.myselfData.bpVote });
                        }
                      }}
                    />
                  </div>
                  <div className="governance-table-checkbox__label" />
                </div>
              </td>
            : props.user.id && props.isPreview ?
              <td className="governance-table__cell governance-table__cell_id" data-name="" />
            :
              null
          }
          <td className="governance-table__cell governance-table__cell_name" data-name="Organization">{item.title}</td>
          <td className="governance-table__cell governance-table__cell_votes" data-name="Votes">
            {item.votesCount} <div className="governance-table__percentage">{item.votesPercentage}%</div>
          </td>
          <td className="governance-table__cell governance-table__cell_amount" data-name="Vote Amount, UOS">{(+item.votesAmount).toLocaleString()}</td>
          <td className="governance-table__cell governance-table__cell_state" data-name="State">
            <span
              className={classNames(
                'badge',
                { 'badge_green': item.bpStatus === BP_STATUS_ACTIVE_ID },
              )}
            >
              {getBpStatusById(item.bpStatus)}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default connect(
  state => ({
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    governanceNodesSetVote,
  }, dispatch),
)(GovernanceTable);
