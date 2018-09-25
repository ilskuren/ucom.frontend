import { connect } from 'react-redux';
import React from 'react';
import Tippy from '@tippy.js/react';
import { selectUser } from '../store/selectors';

const OrganizationsDropdown = (props) => {
  console.log(props.user);

  const organizationsList = (
    <div className="organizations-dropdown__list">

    </div>
  );

  return (
    <div className="organizations-dropdown">
      <div className="organizations-dropdown__toggler" />
      <div className="organizations-dropdown__content">
        <Tippy content={organizationsList}>
          <button>My button</button>
        </Tippy>
      </div>
    </div>
  );
};

export default connect(state => ({
  user: selectUser(state),
}))(OrganizationsDropdown);
