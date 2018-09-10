import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Avatar from './Avatar';
import Popup from './Popup';
import ModalContent from './ModalContent';
import ProfilesList from './ProfilesList';
import { getFileUrl } from '../utils/upload';
import { getUserUrl, getUserName } from '../utils/user';

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
    const { avatar_filename, alt } = avatar;

    const {
      number, orderStacking, size, borderWhite, square,
    } = options;

    return (
      <span
        className="avatars__avatar"
        style={{ zIndex: orderStacking === 'fifo' ? number : '' }}
        key={number}
      >
        <Avatar square={square} src={getFileUrl(avatar_filename)} size={size} alt={alt} borderWhite={borderWhite} />
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
              <ProfilesList
                users={list.map(item => ({
                  id: item.id,
                  userName: getUserName(item),
                  accountName: item.account_name,
                  avatarUrl: getFileUrl(item.avatar_filename),
                  profileLink: getUserUrl(item.id),
                  rate: item.rate,
                }))}
              />
            </ModalContent>
          </Popup>
        )}
      </Fragment>
    );
  }
}

Avatars.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    avatar_filename: PropTypes.string.isRequired,
    alt: PropTypes.string,
    id: PropTypes.string,
    account_name: PropTypes.string,
    rate: PropTypes.string,
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
