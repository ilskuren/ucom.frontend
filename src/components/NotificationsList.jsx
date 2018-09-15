import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Notification from './Notification';

const NotificationsList = props => (
  <div className="notifications-list">
    {props.notifications.map((item, index) => (
      <div key={index} className="notifications-list__notification">
        <Notification
          type={item.type}
          style={item.style}
          title={item.title}
          avatarUrl={item.avatarUrl}
          createdAt={item.createdAt}
          text={item.text}
          status={item.status}
          buttonText={item.buttonText}
          onClick={item.onClick}
        />
      </div>
    ))}
  </div>
);

NotificationsList.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object),
};

export default connect(state => ({
  user: state.user,
  notifications: [
    {
      type: 'verification',
      title: 'Account verification',
      createdAt: 1536988900000,
      text: 'Pass the KYC to create an event with custom cta.',
      status: 'Not verified',
      buttonText: 'Proceed to verification',
      onButtonClick: () => false,
    },
    {
      type: 'black',
      title: 'Account verification',
      createdAt: 1536969600000,
      text: 'Pass the KYC to create an event with custom cta.',
      status: 'Not verified',
      buttonText: 'Proceed to verification',
      onButtonClick: () => false,
    },
    {
      type: 'notification',
      title: 'Text notification',
      text: 'Checkout the real pixels and tell me what you think  of it. Also dont forget to follow Degordian team and stay updated for more shot.',
    },
    {
      type: 'message',
      avatarUrl: 'https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg',
      text: 'We use cookies in order to offer you the best and the most relevant experience. Please accept cookies for optimal performance',
      buttonText: 'I accept Cookies',
      onButtonClick: () => false,
    },
  ],
}))(NotificationsList);
