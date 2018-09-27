import { connect } from 'react-redux';
import React from 'react';
import Notification from './Notifications/Notification';

const Notifications = props => (
  <div className="notifications">
    <div className="notifications__list">
      {false && props.notifications.list.map((item, index) => (
        <div className="notifications__item" key={index}>
          <Notification
            type={item.type}
            title={item.title}
            message={item.message}
          />
        </div>
      ))}
    </div>
  </div>
);

export default connect(state => ({
  notifications: state.notifications,
}))(Notifications);
