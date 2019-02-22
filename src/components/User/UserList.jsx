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

const UserList = (props) => {
  const [popupVisible, setPopupVisible] = useState(false);
  if ((!props.usersIds || !props.usersIds.length) && (!props.myUsers || !props.myUsers.length)) {
    return null;
  }

  const visibleUsers = props.myUsers ? props.myUsers.slice(0, props.limit) : getUsersByIds(props.users, props.usersIds.sort())
    .slice(0, props.limit);
  const allUsers = props.myUsers ? props.myUsers : props.usersIds;
  return (
    <div className="organization-list">
      <div className="organization-list__list">
        {visibleUsers.map(item => (
          <div className="organization-list__item" key={item.id}>
            {props.myUsers ?
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


      {allUsers.length > props.limit &&
        <div className="organization-list__more">
          <button
            className="button-clean button-clean_link"
            onClick={() => setPopupVisible(true)}
          >
            View All
          </button>
        </div>
      }

      {popupVisible && props.myUsers &&
        <Popup onClickClose={() => setPopupVisible(false)}>
          <ModalContent onClickClose={() => setPopupVisible(false)}> (
            <UserListPopup
              myUsers={props.myUsers}
            />
          </ModalContent>
        </Popup>
      }

      {popupVisible && props.usersIds &&
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
