import React from 'react';
import PropTypes from 'prop-types';
import { getDateLeft } from '../utils/offer';

const TimeCounter = ({ startTime, durationInDays }) => {
  const dateLeft = getDateLeft(startTime, durationInDays);

  return (
    <div className="time-counter inline inline_large">
      <div className="inline__item">
        {dateLeft.years > 0 && (
          <div className="time-counter__time">
            <div className="time-counter__value">{dateLeft.years}</div>
            <div className="time-counter__name">{dateLeft.years === 1 ? 'year' : 'years'}</div>
          </div>
        )}
      </div>
      <div className="inline__item">
        {dateLeft.days > 0 && (
          <div className="time-counter__time">
            <div className="time-counter__value">{dateLeft.days}</div>
            <div className="time-counter__name">{dateLeft.years === 1 ? 'day' : 'days'}</div>
          </div>
        )}
      </div>
      <div className="inline__item">
        <div className="time-counter__time">
          <div className="time-counter__value">{dateLeft.time}</div>
          <div className="time-counter__name">{dateLeft.years === 1 ? 'hour' : 'hours'}</div>
        </div>
      </div>
    </div>
  );
};

TimeCounter.propTypes = {
  startTime: PropTypes.number,
  durationInDays: PropTypes.number,
};

export default TimeCounter;
