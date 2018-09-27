import { connect } from 'react-redux';
import React from 'react';
import NotificationError from './Error';
import { NOTIFICATION_TYPE_ERROR } from '../../store/notifications';
import { closeNotification } from '../../actions';

const Notification = (props) => {
  switch (props.type) {
    case NOTIFICATION_TYPE_ERROR: {
      return (
        <NotificationError
          title={props.title}
          message={props.message}
          onClose={() => props.closeNotification(props.id)}
        />
      );
    }

    default: {
      return null;
    }
  }
};

export default connect(null, dispatch => ({
  closeNotification: id => dispatch(closeNotification(id)),
}))(Notification);
