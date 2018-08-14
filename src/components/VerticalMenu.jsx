import React from 'react';
import classNames from 'classnames';

const VerticalMenu = (props) => {
  const sections = props.sections.map((section, i) => (
    <li
      className={classNames('vertical-menu__section', {
      'vertical-menu__section_active': i === 0,
      })}
      key={i}
    >
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
