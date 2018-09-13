import React from 'react';

const FeedToolbar = () => (
  <div className="toolbar">
    <div className="toolbar__main">
      <div className="menu menu_nav menu_responsive">
        <div className="menu__item menu__item_active">
          <button className="menu__link">All</button>
        </div>
        <div className="menu__item">
          <button className="menu__link">Call</button>
        </div>
        <div className="menu__item">
          <button className="menu__link">Poll</button>
        </div>
        <div className="menu__item">
          <button className="menu__link">Appeal</button>
        </div>
        <div className="menu__item">
          <button className="menu__link">Promote</button>
        </div>
      </div>
    </div>

    <div className="toolbar__side">
      Sort by
    </div>
  </div>
);

export default FeedToolbar;
