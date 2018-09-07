import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import Avatar from '../components/Avatar';
import Popup from '../components/Popup';
import ModalContent from '../components/ModalContent';
import ProfilesList from '../components/ProfilesList';
import { getFileUrl } from '../utils/upload';
import { getUserName, getUserUrl } from '../utils/user';

class Followers extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      usersPopupVisible: false,
    };
  }

  hideUsersPopup() {
    this.setState({ usersPopupVisible: false });
  }

  showUsersPopup() {
    if (this.props.users.length) {
      this.setState({ usersPopupVisible: true });
    }
  }

  render() {
    const avatarUsers = this.props.users.slice(0, 2);

    return (
      <Fragment>
        {this.state.usersPopupVisible && (
          <Popup onClickClose={() => this.hideUsersPopup()}>
            <ModalContent onClickClose={() => this.hideUsersPopup()}>
              <ProfilesList
                title={this.props.title}
                users={this.props.users.map(item => ({
                  id: item.id,
                  userName: getUserName(item),
                  accountName: item.account_name,
                  avatarUrl: getFileUrl(item.avatar_filename),
                  profileLink: getUserUrl(item.id),
                  rate: 100,
                }))}
              />
            </ModalContent>
          </Popup>
        )}

        <div className="follwers">
          <div className="follwers__main">
            <div className="follwers__count">
              <button
                onClick={() => this.showUsersPopup()}
                className={classNames(
                  'button-clean',
                  { 'button-clean_link': this.props.users.length },
                )}
              >
                {this.props.users.length}
              </button>
            </div>
            <div className="follwers__title">
              <button
                onClick={() => this.showUsersPopup()}
                className={classNames(
                  'button-clean',
                  { 'button-clean_link': this.props.users.length },
                )}
              >
                {this.props.title}
              </button>
            </div>
          </div>

          {avatarUsers.length > 1 && (
            <div className="follwers__side">
              <div className="avatars-list avatars-list_dual">
                {avatarUsers.map(item => (
                  <div className="avatars-list__item" key={item.id}>
                    <Avatar borderWhite size="xsmall" src={getFileUrl(item.avatar_filename)} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

Followers.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
};

Followers.defaultTypes = {
  title: 'Following',
};

export default Followers;
