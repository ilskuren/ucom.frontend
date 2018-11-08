import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({
  partAmount, fullAmount, title, description, label,
}) => (
  <div className="progress-bar">
    <div className="toolbar">
      <div className="toolbar__main">
        <span className="progress-bar__amount ">
          {`${partAmount} ${label} ${description || ''}`}
        </span>
      </div>
      <div className="toolbar__side progress-bar__amount_small">
        {`${fullAmount} ${label}`}
      </div>
    </div>

    <div className="progress-bar__container">
      <div style={{ width: `${(partAmount * 100) / fullAmount}%` }} className="progress-bar__filler" />
    </div>
    <div className="progress-bar__status">{title}</div>
  </div>
);

ProgressBar.propTypes = {
  title: PropTypes.string,
  partAmount: PropTypes.number,
  fullAmount: PropTypes.number,
  description: PropTypes.string,
  label: PropTypes.string,
};

export default ProgressBar;
