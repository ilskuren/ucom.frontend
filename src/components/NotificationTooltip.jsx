import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconClose from './Icons/Close';
import NotificationItem from './NotificationItem';

class NotificationTooltip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'New notifications',
    };
  }
  render() {
    return (
      <div className="notification-tooltip__container">
        <div className="notification-tooltip__header notification-tooltip__header_new">
          <h3 className="notification-tooltip__title">{this.state.title}</h3>
        </div>
        <div className="notification-tooltip__list notification-tooltip__list__new">
          <NotificationItem
            recent
            avatar="https://steamuserimages-a.akamaihd.net/ugc/933814008881052459/22818793B6D9C730A788E677F998933F9EDDE0B7/"
            name="Suzan Born"
            text="started following you"
            time="today at 9:11 am"
          />
          <NotificationItem
            recent
            avatar="http://profilepicturesdp.com/wp-content/uploads/2018/07/matching-profile-pictures-sun-night-4-1.jpg"
            name="Shiro"
            text=" started following your
            organization Taboon Common"
            time="today at 9:11 am"
            postCover="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Parking_icon.svg/600px-Parking_icon.svg.png"
          />
        </div>
        <div className="notification-tooltip__header notification-tooltip__header_early">
          <h3 className="notification-tooltip__title">Early</h3>
        </div>
        <div className="notification-tooltip__list">
          <NotificationItem
            avatar="https://is4-ssl.mzstatic.com/image/thumb/Purple128/v4/fa/a3/1a/faa31a82-3c25-017c-6320-ca90ee3755aa/source/512x512bb.jpg"
            name="Meka"
            text="replied to your comment in the post"
            post="Who is Rick?"
            reply={{
              replyTime: 'today at 9:11 am',
              replyText: 'James, u said bitcoin would grow, why didn\'t it?',
            }}
            isReplay
            postCover="https://static.thenounproject.com/png/11690-200.png"
          />
        </div>
        <div
          className="inline__item notification-tooltip__close"
          onClick={() => this.props.hideTooltip()}
          role="presentation"
        >
          <IconClose />
        </div>
      </div>
    );
  }
}
NotificationTooltip.propTypes = {
  hideTooltip: PropTypes.func,
};
export default NotificationTooltip;
