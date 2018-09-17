import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const Rate = props => (
  <div className={classNames('rate', props.className)}>
    <div className="rate__value">
      {(+props.value).toLocaleString()}{props.dimension}
    </div>
    <div className="rate__label">{props.label}</div>
  </div>
);

Rate.propTypes = {
  dimension: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Rate.defaultProps = {
  dimension: '°',
  label: 'Rate',
};

export default Rate;
