import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import classNames from 'classnames';

const Rate = (props) => {
  const isBlank = Number.isNaN(+props.value);

  return (
    <div
      className={classNames(
        'rate',
        props.className,
      )}
    >
      <div className="rate__value">
        {!isBlank ? (
          <Fragment>{(+props.value).toLocaleString()}</Fragment>
        ) : (
          <span className="blank">1 000</span>
        )}
        {!isBlank && (
          <span className="rate__degree">°</span>
        )}
      </div>
      <div className="rate__label">
        <span className={classNames({ blank: isBlank })}>Rate</span>
      </div>
    </div>
  );
};

Rate.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Rate;
