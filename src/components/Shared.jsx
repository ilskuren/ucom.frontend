import React from 'react';
import PropTypes from 'prop-types';
import ShareIcon from './Icons/Share';

const Shared = props => (
  <div className="shared">
    <div className="inline inline_xsmall">
      {props.amount && (
        <div className="inline__item">
          <div className="shared__amount">
            <div className="shared__value">{props.amount}</div>
            <div className="shared__label">Shared</div>
          </div>
        </div>
      )}
      <div className="inline__item">
        <div className="shared__button">
          <ShareIcon />
        </div>
      </div>
    </div>
  </div>
);

Shared.propTypes = {
  amount: PropTypes.string,
};

export default Shared;
