import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getDateLeft } from '../utils/offer';

class TimeCounter extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      yearsLeft: 0,
      daysLeft: 0,
      timeLeft: '',
    };
  }

  componentDidMount() {
    this.getDateLeft();

    this.dateLeftInterval = setInterval(() => {
      this.getDateLeft();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.dateLeftInterval);
  }

  getDateLeft() {
    const dateLeft = getDateLeft(this.props.startTime, this.props.durationInDays);

    if (dateLeft) {
      this.setState({
        yearsLeft: dateLeft.years,
        daysLeft: dateLeft.days,
        timeLeft: dateLeft.time,
      });
    } else {
      this.setState({
        yearsLeft: 0,
        daysLeft: 0,
        timeLeft: '',
      });
    }
  }

  render() {
    const { yearsLeft, daysLeft, timeLeft } = this.state;
    return (
      <div className="time-counter inline inline_large">
        {yearsLeft > 0 && (
          <div className="inline__item">
            <div className="time-counter__time">
              <div className="time-counter__value">{yearsLeft}</div>
              <div className="time-counter__name">{yearsLeft === 1 ? 'year' : 'years'}</div>
            </div>
          </div>
        )}
        {daysLeft > 0 && (
          <div className="inline__item">
            <div className="time-counter__time">
              <div className="time-counter__value">{daysLeft}</div>
              <div className="time-counter__name">{daysLeft === 1 ? 'day' : 'days'}</div>
            </div>
          </div>
        )}
        {timeLeft && (
          <div className="inline__item">
            <div className="time-counter__time">
              <div className="time-counter__value">{timeLeft}</div>
              <div className="time-counter__name">{timeLeft === 1 ? 'hour' : 'hours'}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

TimeCounter.propTypes = {
  startTime: PropTypes.string,
  durationInDays: PropTypes.number,
};

export default TimeCounter;
