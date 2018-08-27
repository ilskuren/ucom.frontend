import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const Rate = props => (
  <div className={classNames('rate', props.className)}>
    <div className="rate__value">{props.value.toLocaleString()} <span className="rate__degree">°</span></div>
    <div className="rate__label">Rate</div>
  </div>
);

Rate.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number,
};

Rate.defaultProps = {
  value: 0,
};

export default Rate;
