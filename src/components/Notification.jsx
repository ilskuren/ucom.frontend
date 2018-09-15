import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import TimeDiff from './TimeDiff';
import UserCard from './UserCard';
import Button from './Button';
import KYC from './KYC';
import NotificationSign from './NotificationSign';

const Notification = props => (
  <div className={cn('notification', { [`notification_${props.type}`]: Boolean(props.type) })}>
    <div className="notification__main">
      <UserCard
        userName={props.title}
        accountName={props.createdAt && <TimeDiff startTime={props.createdAt} />}
        avatarUrl={props.avatarUrl}
        className="user-card_text_left"
        icon={props.type !== 'message' ? <NotificationSign type={props.type} /> : null}
      />
      <div className="notification__text">{props.text}</div>
    </div>
    {(props.buttonText || props.status) ? (
      <div className="notification__control inline">
        {props.buttonText && (
          <div className="inline__item">
            <Button
              text={props.buttonText}
              onClick={props.onButtonClick}
              size="small"
              theme={props.type === 'verification' ? 'white' : 'gray'}
            />
          </div>
        )}
        {props.status && (
          <div className="inline__item">
            <KYC title={`Status: ${props.status}`} className="kyc_align_right" />
          </div>
        )}
      </div>
    ) : null}
  </div>
);

Notification.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  avatarUrl: PropTypes.string,
  text: PropTypes.string,
  status: PropTypes.string,
  buttonText: PropTypes.string,
  createdAt: PropTypes.number,
  onButtonClick: PropTypes.func,
};

export default Notification;
