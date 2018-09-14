import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import moment from 'moment';
import UserCard from './UserCard';
import Button from './Button';
import KYC from './KYC';
import BellIcon from './Icons/Bell';

const Bell = () => (
  <div className="notification__bell">
    <BellIcon />
  </div>
);

const Notification = props => (
  <div className="notification">
    <UserCard
      userName={props.title}
      accountName={moment.duration(props.createdAt).humanize()}
      avatarUrl={props.avatarUrl}
      className="user-card_text_left"
      icon={props.type === 'verification' && <Bell />}
    />
    <div className="notification__text">{props.text}</div>
    {(props.buttonText || props.status) ? (
      <div className="notification__control">
        <div className="notification__button">
          <Button text={props.buttonText} onClick={props.onButtonClick} size="small" theme="white" />
        </div>
        <KYC title={`Status: ${props.status}`} />
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
