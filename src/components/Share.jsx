import React from 'react';
import PropTypes from 'prop-types';
import ShareIcon from './Icons/Share';

const Share = props => (
  <div className="share">
    <div className="inline inline_xsmall">
      <div className="inline__item">
        <div className="share__amount">
          <div className="share__value">{props.amount}</div>
          <div className="share__label">Shared</div>
        </div>
      </div>

      <div className="inline__item">
        <div className="share__button">
          <ShareIcon />
        </div>
      </div>
    </div>
  </div>
);

Share.propTypes = {
  amount: PropTypes.string,
};

export default Share;
