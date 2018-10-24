import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar';
import Button from '../Button';
import { CongratulationsIcon } from '../Icons/FeedIcons';
import { confirmNotification, declineNotification } from '../../actions/siteNotifications';
import { getOrganizationUrl } from '../../utils/organization';

const NotificationCardCongratulations = ({
  id,
  createdAt,
  confirmNotification,
  declineNotification,
  finished,
  data: {
    organization: {
      nickname: titleOfOrg,
      id: idOfOrg,
    },
  },
}) => (
  <div className="notification-card notification-card_congratulations">
    <div className="notification-card__block">
      <div className="notification-card__avatar">
        <Avatar srcComponent={<CongratulationsIcon />} />
      </div>
      <div className="notification-card__content">
        <div className="notification-card__description">
          <div className="notification-card__text">
            <strong>Whooooooa! Сongratulations!</strong>
            <p className="notification-card__time">{moment(createdAt).fromNow()}</p>
          </div>
        </div>
      </div>
    </div>

    <p className="notification-card__text notification-card__text_congratulations">
      Welcome my friend. You just joined the <Link target="_blank" to={getOrganizationUrl(idOfOrg)} className="menu__link"><strong>{titleOfOrg}</strong></Link>
    </p>

    {
      !finished &&
      <div className="notification-card__buttons">
        <div className="inline">
          <div className="inline__item">
            <Button
              theme="accent-light"
              size="small"
              text="Confirm"
              isStretched
              onClick={() => confirmNotification(id)}
            />
          </div>
          <div className="inline__item">
            <Button
              theme="accent-gray"
              size="small"
              text="Decline"
              isStretched
              onClick={() => declineNotification(id)}
            />
          </div>
        </div>
      </div>
    }
  </div>
);

NotificationCardCongratulations.propTypes = {
  data: PropTypes.objectOf(PropTypes.object),
  createdAt: PropTypes.string,
  finished: PropTypes.bool,
  id: PropTypes.number,
  confirmNotification: PropTypes.func,
  declineNotification: PropTypes.func,
};

export default connect(
  null,
  dispatch => ({
    confirmNotification: data => dispatch(confirmNotification(data)),
    declineNotification: data => dispatch(declineNotification(data)),
  }),
)(NotificationCardCongratulations);
