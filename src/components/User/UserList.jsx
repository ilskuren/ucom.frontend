import { connect } from 'react-redux';
import React, { useState, Fragment } from 'react';
import { getFileUrl } from '../../utils/upload';
import UserListPopup from './UserListPopup';
import UserListPopupMore from './UserListPopupMore';
import urls from '../../utils/urls';
import { getUsersByIds } from '../../store/users';
import UserCard from '../UserCard';
import { UserCardSimpleWrapper } from '../User/UserCardSimple';

import Popup from '../Popup';
import ModalContent from '../ModalContent';
import { getUserName } from '../../utils/user';
import Rate from '../Rate';

const UserList = (props) => {
  const [popupVisible, setPopupVisible] = useState(false);

  if (!props.usersIds || !props.usersIds.length) {
    return null;
  }

  const visibleUsers = getUsersByIds(props.users, props.usersIds.sort())
    .slice(0, props.limit);

  return (
    <div className="organization-list">
      <div className="organization-list__list">
        {visibleUsers.map(item => (
          <div className="organization-list__item" key={item.id}>
            {props.isNew ?
              <UserCardSimpleWrapper userId={item.id} /> :
              <Fragment>
                <UserCard
                  userName={getUserName(item)}
                  accountName={item.accountName}
                  profileLink={urls.getUserUrl(item.id)}
                  avatarUrl={getFileUrl(item.avatarFilename)}
                  sign="@"
                />
                <div className="organization-list__rate">
                  <Rate value={item.currentRate} />
                </div>
              </Fragment>
            }

          </div>
        ))}
      </div>

      {props.usersIds.length > props.limit &&
        <div className="organization-list__more">
          <button
            className="button-clean button-clean_link"
            onClick={() => setPopupVisible(true)}
          >
            View All
          </button>
        </div>
      }

      {popupVisible &&
        <Popup onClickClose={() => setPopupVisible(false)}>
          <ModalContent onClickClose={() => setPopupVisible(false)}>
            {props.tagTitle ? (
              <UserListPopupMore
                usersIds={props.usersIds}
                tagTitle={props.tagTitle}
              />
            ) : (
              <UserListPopup
                usersIds={props.usersIds}
              />
            )}
          </ModalContent>
        </Popup>
      }
    </div>
  );
};

export default connect(state => ({
  users: state.users,
}))(UserList);
