import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class TimeDiff extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      timeDiff: 0,
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
    const timeDiff = moment(this.props.startTime).fromNow();

    this.setState({
      timeDiff,
    });
  }

  render() {
    const { timeDiff } = this.state;
    return timeDiff || '';
  }
}

TimeDiff.propTypes = {
  startTime: PropTypes.number.isRequired,
};

export default TimeDiff;
