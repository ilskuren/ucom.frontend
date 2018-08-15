import React from 'react';
import classNames from 'classnames';
import Button from './Button';

const NavBar = (props) => {
  const tabs = props.tabs.map((tab, i) => {
    const tabClass = classNames('nav-bar__tab', {
      'nav-bar__tab_active': tab.active,
    });
    return <div className={tabClass} key={i}>{tab.name} </div>;
  });

  const changesNotificationClass = classNames('nav-bar__changes-notification', {
    'nav-bar__changes-notification_displayed': props.isHaveBeenSavedChanges,
  });

  return (
    <div className="nav-bar">
      <div className="nav-bar__title">{props.title}</div>
      <div className="nav-bar__menu">
        <div className="nav-bar__tabs">{tabs}</div>
        <div className={changesNotificationClass}>Your changes have been saved.</div>
        <div className="nav-bar__back-button">
          <Button text="Back to Profile" size="small" theme="white" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
