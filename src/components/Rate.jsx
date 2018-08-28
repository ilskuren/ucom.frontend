import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import classNames from 'classnames';

const Rate = props => (
  <div className={classNames('rate', props.className)}>
    <div className="rate__value">
      {!Number.isNaN(+props.value) ? (
        <Fragment>{(+props.value).toLocaleString()}</Fragment>
      ) : (
        <span className="blank">lorem</span>
      )}
      <span className="rate__degree">°</span>
    </div>
    <div className="rate__label">Rate</div>
  </div>
);

Rate.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Rate;
