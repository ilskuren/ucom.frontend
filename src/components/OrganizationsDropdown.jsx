import { connect } from 'react-redux';
import React from 'react';
import Tippy from '@tippy.js/react';
import { selectUser } from '../store/selectors';

const OrganizationsDropdown = () => {
  const organizationsContent = (
    <div className="organizations-dropdown__content">
      <div className="organizations-dropdown__list" />
    </div>
  );

  return (
    <div className="organizations-dropdown">
      <Tippy content={organizationsContent}>
        <div className="organizations-dropdown__toggler" />
      </Tippy>
    </div>
  );
};

export default connect(state => ({
  user: selectUser(state),
}))(OrganizationsDropdown);
