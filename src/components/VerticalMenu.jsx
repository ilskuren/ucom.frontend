import React from 'react';

const VerticalMenu = (props) => {
  const sections = props.sections.map((section, i) => (
    <li className={`vertical-menu__section ${i === 0 ? 'vertical-menu__section_active' : ''}`} key={i}>
      <span className="vertical-menu__type">{section.type}</span>
      <span className="vertical-menu__percentages">{`${section.percentages}%`}</span>
    </li>));

  return (
    <ul className="vertical-menu">
      {sections}
    </ul>
  );
};

export default VerticalMenu;
