import { range } from 'lodash';
import Select from 'react-select';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import dict from '../utils/dict';

class DateInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      day: '',
      month: '',
      year: '',
    };
  }

  componentDidMount() {
    this.setDateValues();
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;
    if (value !== prevProps.value) {
      this.setDateValues();
    }
  }

  onChange() {
    if (typeof this.props.onChange !== 'function') {
      return;
    }

    if (this.state.day && this.state.month && this.state.year) {
      this.props.onChange(`${this.state.year}-${this.state.month}-${this.state.day}`);
    }
  }

  getDaysInMonth(year, month, day) {
    const daysInMonth = moment(`${year || '2000'}-${month || '01'}-01`).daysInMonth();
    if (daysInMonth < day) {
      this.setState({ day: String(daysInMonth) });
    }
    return daysInMonth;
  }

  setDateValues() {
    const { value } = this.props;
    const date = value ? value.split('-') : null;
    const daysInMonth = this.getDaysInMonth(date ? date[0] : 2000, date ? date[1] : '01', date ? date[2] : 31);

    this.setState({
      day: date ? date[2] : '',
      month: date ? date[1] : '',
      year: date ? date[0] : '',
      daysInMonth,
    });
  }

  convertToTimeString(time) {
    return `${time < 10 ? '0' : ''}${time}`;
  }

  render() {
    const days = range(1, this.state.daysInMonth + 1).map(i => ({ value: i, label: i }));
    const years = range(2018, 1905).map(i => ({ value: i, label: i }));
    const { error, touched } = this.props;
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
              this.setState({
                day: this.convertToTimeString(item.value),
              }, () => {
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
              const month = this.convertToTimeString(item.value);
              this.setState({
                month,
                daysInMonth: this.getDaysInMonth(this.state.year, month, this.state.day),
              }, () => {
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
              this.setState({
                year: String(item.value),
                daysInMonth: this.getDaysInMonth(String(item.value), this.state.month, this.state.day),
              }, () => {
                this.onChange();
              });
            }}
          />
        </div>
        { touched && error && <div className="date-input__error">{error}</div> }
      </div>
    );
  }
}

DateInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  onChange: PropTypes.func,
};

export default DateInput;
