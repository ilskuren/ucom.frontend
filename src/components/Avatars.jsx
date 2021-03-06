import { Link } from 'react-router-dom';
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Avatar from './Avatar';
import Popup from './Popup';
import ModalContent from './ModalContent';
import ProfilesList from './ProfilesList';

class Avatars extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      popupIsVisible: false,
    };
  }

  hidePopup() {
    this.setState({ popupIsVisible: false });
  }

  showPopup() {
    this.setState({ popupIsVisible: true });
  }

  renderAvatar = (avatar, options) => {
    const { avatarUrl, alt } = avatar;
    const { distance } = this.props;
    const {
      number, orderStacking, size, borderWhite, square,
    } = options;
    const zIndex = (() => {
      if (distance !== 'far') {
        return orderStacking === 'fifo' ? number : '';
      }
      return null;
    })();
    const LinkTag = avatar.profileLink ? Link : 'span';

    return (
      <LinkTag
        to={avatar.profileLink}
        className={cn('avatars__avatar', { [`avatars__avatar_distance_${distance}`]: Boolean(distance) })}
        style={{ zIndex }}
        key={number}
      >
        <Avatar square={square} src={avatarUrl} size={size} alt={alt} borderWhite={borderWhite} />
      </LinkTag>
    );
  };

  render() {
    const {
      list, maxAvatarsAmount = 5, size, ...rest
    } = this.props;
    const listHead = list.slice(0, maxAvatarsAmount);
    const count = list.length - maxAvatarsAmount;

    return (
      <Fragment>
        <div data-avatars={maxAvatarsAmount} className={cn('avatars', { [`avatars_${size}`]: Boolean(size) })}>
          <div className="avatars__list">
            {
              listHead.map((avatar, avatarIndex, arr) =>
                this.renderAvatar(avatar, { number: arr.length - avatarIndex, size, ...rest }))
            }
          </div>
          {count > 0 && (
            <div role="presentation" className="avatars__more" onClick={() => this.showPopup()}>
              +{count}
            </div>
          )}
        </div>
        {this.state.popupIsVisible && (
          <Popup onClickClose={() => this.hidePopup()}>
            <ModalContent onClickClose={() => this.hidePopup()}>
              <ProfilesList users={list} />
            </ModalContent>
          </Popup>
        )}
      </Fragment>
    );
  }
}

Avatars.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    alt: PropTypes.string,
    avatarUrl: PropTypes.string,
    accountName: PropTypes.string,
    rate: PropTypes.number,
    profileLink: PropTypes.string,
    userName: PropTypes.string,
  })).isRequired,
  square: PropTypes.bool,
  borderWhite: PropTypes.bool,
  orderStacking: PropTypes.oneOf(['fifo', 'lifo']).isRequired,
  size: PropTypes.string,
  maxAvatarsAmount: PropTypes.number,
  distance: PropTypes.oneOf(['close', 'far']),
};

Avatars.defaultProps = {
  maxAvatarsAmount: 5,
};

export default Avatars;
