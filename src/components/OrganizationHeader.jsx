import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import Avatar from './Avatar';
import Rate from './Rate';
import FollowButton from './FollowButton';
import Followers from './Followers';
import { getOrganizationEditUrl } from '../utils/organization';

const OrganizationHeader = props => (
  <div className="organization-header">
    <div className="organization-header__top">
      <div className="organization-header__aside">
        <Avatar size="medium" src={props.avatarSrc} square rounded />
      </div>

      <div className="organization-header__main">
        <div className="organization-header__title">
          {props.title}
          &nbsp;
          {props.id && props.editable && (
            <Link to={getOrganizationEditUrl(props.id)}>
              <span className="edit" />
            </Link>
          )}
        </div>
        <div className="organization-header__nickname">@{props.nickname}</div>
        {props.poweredBy && (
          <div className="organization-header__poweredby">Powered by {props.poweredBy}</div>
        )}
      </div>

      <div className="organization-header__bside">
        {props.position && (
          <div className="organization-header__position">#{props.position}</div>
        )}
        <div className="organization-header__rate">
          <Rate value={props.currentRate} className="rate_big" />
        </div>
      </div>
    </div>
    <div className="organization-header__bottom">
      <div className="toolbar toolbar_responsive">
        <div className="toolbar__main">
          <div className="organization-header__follow-btn">
            <FollowButton
              isStretched
              userId={props.id}
            />
          </div>
        </div>
        <div className="toolbar__side">
          <div className="inline">
            <div className="inline__item">
              <Followers title="Joined" users={props.joined} />
            </div>
            <div className="inline__item">
              <Followers title="Followers" users={props.followers} />
            </div>
            <div className="inline__item">
              <Followers title="Trusted by" users={props.trustedBy} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

OrganizationHeader.propTypes = {
  avatarSrc: PropTypes.string,
  title: PropTypes.string,
  nickname: PropTypes.string,
  poweredBy: PropTypes.string,
  currentRate: PropTypes.number,
  id: PropTypes.number,
  position: PropTypes.number,
  joined: PropTypes.arrayOf(PropTypes.object),
  followers: PropTypes.arrayOf(PropTypes.object),
  trustedBy: PropTypes.arrayOf(PropTypes.object),
  editable: PropTypes.bool,
};

export default OrganizationHeader;
