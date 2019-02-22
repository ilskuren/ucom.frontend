import { connect } from 'react-redux';
import React, { useState } from 'react';
import { getFileUrl } from '../../utils/upload';
import urls from '../../utils/urls';
import UserListPopup from './UserListPopup';
import UserListPopupMore from './UserListPopupMore';
import { getUsersByIds } from '../../store/users';
import DefaultUserCard, { MyUserCard } from '../UserCard/UserCard';
import Popup from '../Popup';
import ModalContent from '../ModalContent';
import { getUserName } from '../../utils/user';

const UserList = ({
  usersIds, myUsers, limit, users, tagTitle, loadMore,
}) => {
  const [popupVisible, setPopupVisible] = useState(false);
  if ((!usersIds || !usersIds.length) && (!myUsers || !myUsers.length)) {
    return null;
  }

  const visibleUsers = myUsers ? myUsers.slice(0, limit) : getUsersByIds(users, usersIds.sort())
    .slice(0, limit);

  const allUsers = myUsers || usersIds;
  return (
    <div className="organization-list">
      <div className="organization-list__list">
        {visibleUsers.map(item => (
          <div className="organization-list__item" key={item.id}>
            {myUsers ?
              <MyUserCard
                name={getUserName(item)}
                userPickAlt={getUserName(item)}
                url={urls.getUserUrl(item.id)}
                userPickSrc={getFileUrl(item.avatarFilename)}
                rate={item.currentRate}
              /> : <DefaultUserCard userId={item.id} />
            }
          </div>
        ))}
      </div>


      {allUsers.length > limit &&
        <div className="organization-list__more">
          <button
            className="button-clean button-clean_link"
            onClick={async () => { await loadMore(); setPopupVisible(true); }}
          >
            View All
          </button>
        </div>
      }

      {popupVisible && myUsers &&
        <Popup onClickClose={() => setPopupVisible(false)}>
          <ModalContent onClickClose={() => setPopupVisible(false)}>
            <UserListPopup
              myUsers={myUsers}
              title="Users"
            />
          </ModalContent>
        </Popup>
      }

      {popupVisible && usersIds &&
        <Popup onClickClose={() => setPopupVisible(false)}>
          <ModalContent onClickClose={() => setPopupVisible(false)}>
            {tagTitle ? (
              <UserListPopupMore
                usersIds={usersIds}
                tagTitle={tagTitle}
              />
            ) : (
              <UserListPopup
                usersIds={usersIds}
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
