import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../components/TextInput';
import Dropdown from '../components/Dropdown';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DateInput = ({
  label, dayValue, monthValue, yearValue,
}) => (
  <div className="date-input">
    { label && <div className="date-input__label">{label}</div> }
    <div className="date-input__day">
      <TextInput value={dayValue} subtext="Date" />
    </div>
    <div className="date-input__month">
      <Dropdown value={monthValue} subtext="Month" options={MONTHS} error="Error" />
    </div>
    <div className="date-input__year">
      <TextInput value={yearValue} subtext="Year" />
    </div>
  </div>
);

DateInput.propTypes = {
  label: PropTypes.string,
  dayValue: PropTypes.string,
  monthValue: PropTypes.string,
  yearValue: PropTypes.string,
};

export default DateInput;
