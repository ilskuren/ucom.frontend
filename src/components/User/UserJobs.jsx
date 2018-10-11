import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { getUserById } from '../../store/users';
import { getYearOfDate } from '../../utils/user';

const UserJobs = (props) => {
  const user = getUserById(props.users, props.userId);

  if (!user) {
    return null;
  }

  if (!user.usersJobs || !user.usersJobs.length) {
    return null;
  }

  return (
    <div className="user-section">
      <div className="user-section__title">
        <h3 className="title title_xsmall title_light">Work Experience</h3>
      </div>
      <div className="user-section__content">
        <ul className="experience">
          {user.usersJobs.map(item => (
            <li className="experience__item" key={item.id}>
              <div className="experience__header">
                <div className="toolbar">
                  <div className="toolbar__main">
                    <div className="experience__name">{item.title}</div>
                  </div>
                  {item.startDate && (
                    <div className="toolbar__side">
                      <div className="experience__state">
                        {getYearOfDate(item.startDate)} – {item.endDate ? getYearOfDate(item.endDate) : 'Now'}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="experience__status">{item.position}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

UserJobs.propTypes = {
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  userId: PropTypes.number.isRequired,
};

export default connect(state => ({
  users: state.users,
}))(UserJobs);
