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

    const {
      number, orderStacking, size, borderWhite, square,
    } = options;

    return (
      <span
        className="avatars__avatar"
        style={{ zIndex: orderStacking === 'fifo' ? number : '' }}
        key={number}
      >
        <Avatar square={square} src={avatarUrl} size={size} alt={alt} borderWhite={borderWhite} />
      </span>
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
        <div className={cn('avatars', { [`avatars_${size}`]: Boolean(size) })}>
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
};

Avatars.defaultProps = {
  maxAvatarsAmount: 5,
};

export default Avatars;
