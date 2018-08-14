import React from 'react';

const VerticalMenu = (props) => {
  const sections = props.sections.map(section => <li className="vertical-menu__section">{section}</li>);

  return (
    <ul className="vertical-menu">
      {sections}
    </ul>
  );
};

export default VerticalMenu;
