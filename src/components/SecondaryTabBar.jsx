import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

const SecondaryTabBar = ({ tabs, activeTab }) => (
  <div className="secondary-tab-bar">
    { tabs.map((tab, index) => (
      <a
        key={index}
        className={
          cn('secondary-tab-bar__element', {
            'secondary-tab-bar__element_active': tab === activeTab,
          })
        }
      >
        {tab}
      </a>
    ))}
  </div>
);

SecondaryTabBar.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string),
  activeTab: PropTypes.string.isRequired,
};

SecondaryTabBar.defaultProps = {
  tabs: [],
};

export default SecondaryTabBar;
