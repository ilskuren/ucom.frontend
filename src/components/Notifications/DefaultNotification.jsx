import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import IconBell from '../Icons/BellOutlined';
import IconClose from '../Icons/Close';
import {
  NOTIFICATION_TYPE_ERROR,
  NOTIFICATION_TYPE_SUCCESS,
} from '../../store/notifications';

class Notification extends PureComponent {
  componentDidMount() {
    setTimeout(() => this.props.onClose(), 5000);
  }

  render() {
    return (
      <div
        className={classNames(
          'notification',
          { 'notification_error': this.props.typeId === NOTIFICATION_TYPE_ERROR },
          { 'notification_success': this.props.typeId === NOTIFICATION_TYPE_SUCCESS },
        )}
      >
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
  typeId: PropTypes.number,
};

Notification.defaultProps = {
  title: 'Error',
};

export default Notification;
