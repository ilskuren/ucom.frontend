import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import Avatar from '../Avatar';

const NotificationCardDefault = props => (
  <div className="site-notification">
    {props.userUrl &&
      <div className="site-notification__avatar">
        <Link to={props.userUrl}>
          <Avatar src={props.userAvatarSrc} icon={props.userAvatarIcon} />
        </Link>
      </div>
    }

    <div className="site-notification__content">
      <div className="site-notification__title">{props.title}</div>
      {props.createAt && (
        <div className="site-notification__time">{moment(props.createAt).fromNow()}</div>
      )}
    </div>

    {props.postUrl &&
      <div className="site-notification__cover">
        <Link to={props.postUrl}>
          <Avatar src={props.postAvatarSrc} square />
        </Link>
      </div>
    }
  </div>
);

NotificationCardDefault.propTypes = {
  userUrl: PropTypes.string,
  userAvatarSrc: PropTypes.string,
  userAvatarIcon: PropTypes.element,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  postUrl: PropTypes.string,
  postAvatarSrc: PropTypes.string,
  createAt: PropTypes.string,
};

export default NotificationCardDefault;
