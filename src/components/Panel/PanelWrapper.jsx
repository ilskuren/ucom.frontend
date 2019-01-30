import React, { useState } from 'react';
import Panel from './Panel';

const PanelWrapper = (props) => {
  const [active, toggleActive] = useState(false);

  return (
    <Panel
      title={props.title}
      active={active}
      onClickToggler={() => toggleActive(!active)}
    >
      {props.children}
    </Panel>
  );
};

export default PanelWrapper;
