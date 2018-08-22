import { range } from 'lodash';
import Select from 'react-select';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import dict from '../utils/dict';

class DateInput extends PureComponent {
  constructor(props) {
    super(props);

    const date = props.value ? props.value.split('-') : null;

    this.state = {
      day: date ? date[2] : '',
      month: date ? date[1] : '',
      year: date ? date[0] : '',
    };
  }

  onChange() {
    if (typeof this.props.onChange !== 'function') {
      return;
    }

    if (this.state.day && this.state.month && this.state.year) {
      this.props.onChange(`${this.state.year}-${this.state.month}-${this.state.day}`);
    }
  }

  render() {
    const days = range(1, 32).map(i => ({ value: i, label: i }));
    const years = range(2018, 1905).map(i => ({ value: i, label: i }));

    return (
      <div className="date-input">
        { this.props.label && <div className="date-input__label">{this.props.label}</div> }

        <div className="date-input__day">
          <Select
            className="select"
            classNamePrefix="select"
            placeholder="Day"
            options={days}
            value={days.find(i => +i.value === +this.state.day)}
            onChange={(item) => {
              this.setState({ day: item.value }, () => {
                this.onChange();
              });
            }}
          />
        </div>

        <div className="date-input__month">
          <Select
            className="select"
            classNamePrefix="select"
            placeholder="Month"
            options={dict.months}
            value={dict.months.find(i => +i.value === +this.state.month)}
            onChange={(item) => {
              this.setState({ month: item.value }, () => {
                this.onChange();
              });
            }}
          />
        </div>

        <div className="date-input__year">
          <Select
            className="select"
            classNamePrefix="select"
            placeholder="Year"
            options={years}
            value={years.find(i => +i.value === +this.state.year)}
            onChange={(item) => {
              this.setState({ year: item.value }, () => {
                this.onChange();
              });
            }}
          />
        </div>
      </div>
    );
  }
}

DateInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default DateInput;
