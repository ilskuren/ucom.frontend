import React from 'react';
import Checkbox from '../Checkbox';
import IconTableTriangle from '../Icons/TableTriangle';

const GovernanceTable = () => (
  <table className="governance-table">
    <thead className="governance-table__head">
      <tr className="governance-table__row">
        <td className="governance-table__cell governance-table__cell_id">#</td>
        <td className="governance-table__cell governance-table__cell_name governance-table__cell_sortable">
          <span className="inline inline_small">
            <span className="inline__item">Organization</span>
            <span className="inline__item"><IconTableTriangle /></span>
          </span>
        </td>
        <td className="governance-table__cell governance-table__cell_votes">Votes</td>
        <td className="governance-table__cell governance-table__cell_amount">Vote Amount, UOS</td>
        <td className="governance-table__cell governance-table__cell_state">State</td>
      </tr>
    </thead>
    <tbody className="governance-table__body">
      <tr className="governance-table__row">
        <td className="governance-table__cell governance-table__cell_id" data-name="#">
          <div className="inline">
            <div className="inline__item"><Checkbox /></div>
            <div className="inline__item">1</div>
          </div>
        </td>
        <td className="governance-table__cell governance-table__cell_name" data-name="Organization">Walmart</td>
        <td className="governance-table__cell governance-table__cell_votes" data-name="Votes">4321</td>
        <td className="governance-table__cell governance-table__cell_amount" data-name="Vote Amount, UOS">508.266</td>
        <td className="governance-table__cell governance-table__cell_state" data-name="State">
          <span className="badge">Actve</span>
        </td>
      </tr>
      <tr className="governance-table__row">
        <td className="governance-table__cell governance-table__cell_id" data-name="#">
          <div className="inline">
            <div className="inline__item"><Checkbox /></div>
            <div className="inline__item">1</div>
          </div>
        </td>
        <td className="governance-table__cell governance-table__cell_name" data-name="Organization">Walmart</td>
        <td className="governance-table__cell governance-table__cell_votes" data-name="Votes">4321</td>
        <td className="governance-table__cell governance-table__cell_amount" data-name="Vote Amount, UOS">508.266</td>
        <td className="governance-table__cell governance-table__cell_state" data-name="State">
          <span className="badge">Actve</span>
        </td>
      </tr>
      <tr className="governance-table__row">
        <td className="governance-table__cell governance-table__cell_id" data-name="#">
          <div className="inline">
            <div className="inline__item"><Checkbox /></div>
            <div className="inline__item">1</div>
          </div>
        </td>
        <td className="governance-table__cell governance-table__cell_name" data-name="Organization">Walmart</td>
        <td className="governance-table__cell governance-table__cell_votes" data-name="Votes">4321</td>
        <td className="governance-table__cell governance-table__cell_amount" data-name="Vote Amount, UOS">508.266</td>
        <td className="governance-table__cell governance-table__cell_state" data-name="State">
          <span className="badge">Actve</span>
        </td>
      </tr>
    </tbody>
  </table>
);

export default GovernanceTable;
