import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const NavBar = (props) => {
  const tabs = props.tabs.map((tab, i) => (
    <div className="menu__item menu__item_active" key={i}>
      <a href="#" className="menu__link">{tab.name}</a>
    </div>
  ));

  return (
    <div className="nav-bar">
      <div className="nav-bar__content">
        <div className="nav-bar__title">{props.title}</div>
        <div className="nav-bar__menu">
          <div className="toolbar toolbar_responsive">
            <div className="toolbar__main">
              <div className="menu menu_simple-tabs">{tabs}</div>
            </div>
            <div className="toolbar__side">
              <div className="inline">
                { props.isHaveBeenSavedChanges &&
                  <div className="inline__item">
                    Your changes have been saved
                  </div>
                }
                { props.isDisplayedBackButton &&
                  <div className="inline__item">
                    <Button text="Back to Profile" size="small" theme="transparent" />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

NavBar.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    active: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  title: PropTypes.string.isRequired,
  isHaveBeenSavedChanges: PropTypes.bool,
  isDisplayedBackButton: PropTypes.bool,
};

export default NavBar;
