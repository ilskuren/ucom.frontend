import React from 'react';
import PropTypes from 'prop-types';

const fixAmount = amount => Math.round(amount * 100) / 100;

const ProgressBar = ({
  partAmount, fullAmount, title, description, label,
}) => {
  const fixedPartAmount = fixAmount(partAmount);
  const fixedFullAmount = fixAmount(fullAmount);

  return (
    <div className="progress-bar">
      <div className="toolbar">
        <div className="toolbar__main">
          <span className="progress-bar__amount ">
            {`${fixedPartAmount} ${label} ${description || ''}`}
          </span>
        </div>
        <div className="toolbar__side progress-bar__amount_small">
          {`${fixedFullAmount} ${label}`}
        </div>
      </div>

      <div className="progress-bar__container">
        <div style={{ width: `${(fixedPartAmount * 100) / fixedFullAmount}%` }} className="progress-bar__filler" />
      </div>
      <div className="progress-bar__status">{title}</div>
    </div>
  );
};

ProgressBar.propTypes = {
  title: PropTypes.string,
  partAmount: PropTypes.number,
  fullAmount: PropTypes.number,
  description: PropTypes.string,
  label: PropTypes.string,
};

export default ProgressBar;
