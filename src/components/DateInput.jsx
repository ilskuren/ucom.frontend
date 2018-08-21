import { range } from 'lodash';
import moment from 'moment';
import Select from 'react-select';
import React from 'react';
import PropTypes from 'prop-types';
import dict from '../utils/dict';

const DateInput = ({ label, value, onChange }) => {
  const mdate = moment(value);
  const day = mdate.date();
  const month = mdate.month();
  const year = mdate.year();
  const days = range(1, 32).map(i => ({ value: i, label: i }));
  const years = range(2018, 1905).map(i => ({ value: i, label: i }));

  return (
    <div className="date-input">
      { label && <div className="date-input__label">{label}</div> }

      <div className="date-input__day">
        <Select
          value={days.find(i => i.value === day)}
          className="select"
          classNamePrefix="select"
          options={days}
          onChange={(e) => {
            if (typeof onChange === 'function') {
              onChange(`${e.value}-${month}-${year}`);
            }
          }}
        />
      </div>

      <div className="date-input__month">
        <Select
          value={dict.months[month]}
          className="select"
          classNamePrefix="select"
          options={dict.months}
          onChange={(e) => {
            if (typeof onChange === 'function') {
              onChange(`${day}-${e.value}-${year}`);
            }
          }}
        />
      </div>

      <div className="date-input__year">
        <Select
          value={years.find(i => i.value === year)}
          className="select"
          classNamePrefix="select"
          options={years}
          onChange={(e) => {
            if (typeof onChange === 'function') {
              onChange(`${day}-${month}-${e.value}`);
            }
          }}
        />
      </div>
    </div>
  );
};

DateInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
};

export default DateInput;
