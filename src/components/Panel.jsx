import React from 'react';
import IconPlus from './Icons/Plus';
import IconMinus from './Icons/Minus';

const Panel = props => (
  <div className="panel">
    <div
      role="presentation"
      className="panel__header"
      onClick={() => props.onClickToggler && props.onClickToggler()}
    >
      <div className="panel__title">{props.title}</div>
      <div className="panel__toggler">
        {props.active ? <IconMinus /> : <IconPlus /> }
      </div>
    </div>
    {props.active &&
      <div className="panel__content">
        {props.children}
      </div>
    }
  </div>
);

export default Panel;
