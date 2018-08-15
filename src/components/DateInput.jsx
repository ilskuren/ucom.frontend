import React from 'react';
import classNames from 'classnames';
import TextInput from '../components/TextInput';
import Dropdown from '../components/Dropdown';

const MONTH = [
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

const DateInput = () => (
  <div className="date-input">
    <div className="date-input__day">
      <TextInput subtext="Date" />
    </div>
    <div className="date-input__month">
      <Dropdown subtext="Month" options={MONTH} error="Error" />
    </div>
    <div className="date-input__year">
      <TextInput subtext="Year" />
    </div>
  </div>
);

export default DateInput;
