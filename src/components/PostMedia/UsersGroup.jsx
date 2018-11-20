import PropTypes from 'prop-types';
import React, { PureComponent, Fragment } from 'react';
import UserCard from '../UserCard';
import Popup from '../Popup';
import ModalContent from '../ModalContent';
import ProfilesList from '../ProfilesList';
import { getUserName, getUserUrl } from '../../utils/user';
import { getFileUrl } from '../../utils/upload';

class UsersGroup extends PureComponent {
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
    this.setState({ usersPopupVisible: true });
  }

  render() {
    const usersToShow = this.props.users.slice(0, 5);

    return (
      <Fragment>
        {this.state.usersPopupVisible && (
          <Popup onClickClose={() => this.hideUsersPopup()}>
            <ModalContent onClickClose={() => this.hideUsersPopup()}>
              <ProfilesList
                title={this.props.title}
                users={this.props.users.map(item => ({
                  id: item.id,
                  rate: item.currentRate,
                  userName: getUserName(item),
                  accountName: item.accountName,
                  avatarUrl: getFileUrl(item.avatarFilename),
                  profileLink: getUserUrl(item.id),
                }))}
              />
            </ModalContent>
          </Popup>
        )}

        <div className="users-group">
          <h4 className="users-group__title">{this.props.title}</h4>

          <div className="users-group__list">
            {usersToShow.map(user => (
              <div className="users-group__item" key={user.id}>
                <UserCard
                  userName={getUserName(user)}
                  accountName={user.accountName}
                  profileLink={getUserUrl(user.id)}
                  avatarUrl={getFileUrl(user.avatarFilename)}
                  sign="@"
                />
              </div>
            ))}
          </div>

          {this.props.users.length > 5 && (
            <div className="users-group__show-more">
              <button
                className="button-clean button-clean_link"
                onClick={() => this.showUsersPopup()}
              >
                View All
              </button>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

UsersGroup.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
};

UsersGroup.defaultProps = {
  users: [],
  title: 'People',
};

export default UsersGroup;
