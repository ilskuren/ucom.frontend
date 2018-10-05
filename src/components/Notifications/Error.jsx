import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import IconBell from '../Icons/BellOutlined';
import IconClose from '../Icons/Close';

class Notification extends PureComponent {
  componentDidMount() {
    setTimeout(() => this.props.onClose(), 5000);
  }

  render() {
    return (
      <div className="notification notification_error">
        <div
          role="presentation"
          className="notification__close"
          onClick={() => this.props.onClose()}
        >
          <IconClose />
        </div>
        <div className="notification__header">
          <div className="inline inline_medium">
            <div className="inline__item">
              <div className="notification__icon">
                <IconBell />
              </div>
            </div>
            <div className="inline__item">
              <div className="notification__title">{this.props.title}</div>
            </div>
          </div>
        </div>
        <div className="notification__content">{this.props.message}</div>
      </div>
    );
  }
}

Notification.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

Notification.defaultProps = {
  title: 'Error',
};

export default Notification;
