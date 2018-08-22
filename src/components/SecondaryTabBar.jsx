import React from 'react';
import cn from 'classnames';

const SecondaryTabBar = () => (
  <div className="secondary-tab-bar">
    <a className={cn('secondary-tab-bar__element', {
          'secondary-tab-bar__element_active': true,
        })
    }
    >
      Story
    </a>
    <a className="secondary-tab-bar__element">Challenge</a>
    <a className="secondary-tab-bar__element">Poll</a>
    <a className="secondary-tab-bar__element">News</a>
    <a className="secondary-tab-bar__element">Trading Forecast</a>
    <a className="secondary-tab-bar__element">Review</a>
    <a className="secondary-tab-bar__element">Analitics</a>
    <a className="secondary-tab-bar__element">Interview</a>
  </div>
);

export default SecondaryTabBar;
