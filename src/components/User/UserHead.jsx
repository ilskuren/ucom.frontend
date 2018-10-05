import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import Avatar from '../Avatar';
import IconEdit from '../Icons/Edit';
import Rate from '../Rate';
import { getUserById } from '../../store/users';
import { getFileUrl } from '../../utils/upload';
import { getUserName, getYearsFromBirthday } from '../../utils/user';
import { selectUser } from '../../store/selectors/user';

const UserHead = (props) => {
  const user = getUserById(props.users, props.userId);

  if (!user) {
    return null;
  }

  const userJob = user.usersJobs && user.usersJobs[user.usersJobs.length - 1];
  const userYears = getYearsFromBirthday(user.birthday);

  return (
    <div className="user-header">
      <div className="user-header__main">
        <Avatar size="medium" src={getFileUrl(user.avatarFilename)} />
      </div>

      <div className="user-header__side">
        <div className="toolbar toolbar_top">
          <div className="toolbar__main">
            <div className="user-header__name">
              <h1 className="title title_light">
                <span className="inline">
                  <span className="inline__item">{getUserName(user)}</span>
                </span>
                {props.user.id && props.user.id === user.id && (
                  <span className="inline__item">
                    <Link className="button-icon button-icon_edit" to="/profile/general-info">
                      <IconEdit />
                    </Link>
                  </span>
                )}
              </h1>
            </div>

            <div className="user-header__account-name">@{user.nickname}</div>

            {((userJob && userJob.position) || userYears) && (
              <div className="user-header__info">
                <div className="inline">
                  {userJob && userJob.position && (
                    <div className="inline__item">{userJob.position}</div>
                  )}
                  {userYears && (
                    <div className="inline__item">{userYears} y.o.</div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="toolbar__side">
            <div className="user-header__rate">
              <Rate className="rate_big" value={user.currentRate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(state => ({
  users: state.users,
  user: selectUser(state),
}))(UserHead);
