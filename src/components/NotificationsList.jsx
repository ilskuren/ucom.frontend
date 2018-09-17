import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Notification from './Notification';

const NotificationsList = ({ notifications }) => (
  <div className="notifications-list">
    {notifications.slice(1).map((item, index) => (
      <div key={index} className="notifications-list__notification">
        <Notification
          type={item.type}
          theme={item.theme}
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
    <div className="notifications-list__notification notifications-list__notification_wide">
      <Notification
        type={notifications[0].type}
        theme={notifications[0].theme}
        title={notifications[0].title}
        avatarUrl={notifications[0].avatarUrl}
        createdAt={notifications[0].createdAt}
        text={notifications[0].text}
        status={notifications[0].status}
        buttonText={notifications[0].buttonText}
        onClick={notifications[0].onClick}
      />
    </div>
  </div>
);

NotificationsList.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object),
};

export default connect(() => ({
  notifications: [
    {
      type: 'message',
      avatarUrl: 'https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg',
      title: 'We use cookies in order to offer you the best and the most relevant experience. Please accept cookies for optimal performance',
      buttonText: 'I accept Cookies',
      onButtonClick: () => false,
    },
    {
      type: 'verification',
      theme: 'gray',
      title: 'Account verification',
      createdAt: 1536988900000,
      text: 'Pass the KYC to create an event with custom cta.',
      status: 'Not verified',
      buttonText: 'Proceed to verification',
      onButtonClick: () => false,
    },
    {
      type: 'verification',
      theme: 'black',
      title: 'Account verification',
      createdAt: 1536969600000,
      text: 'Pass the KYC to create an event with custom cta.',
      status: 'Not verified',
      buttonText: 'Proceed to verification',
      onButtonClick: () => false,
    },
    {
      type: 'notification',
      theme: 'red',
      title: 'Text notification',
      text: 'Checkout the real pixels and tell me what you think  of it. Also dont forget to follow Degordian team and stay updated for more shot.',
    },
  ],
}))(NotificationsList);
