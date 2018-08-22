import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const VerticalMenu = (props) => {
  const sections = props.sections.map((section, i) => (
    <li
      className={classNames('vertical-menu__section', {
      'vertical-menu__section_active': true,
      })}
      key={i}
    >
      <span className="vertical-menu__type">{section.type}</span>
      {/* <span className="vertical-menu__percents">{`${section.percents}%`}</span> */}
    </li>));

  return (
    <ul className="vertical-menu">
      {sections}
    </ul>
  );
};

VerticalMenu.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    percents: PropTypes.string.isRequired,
  })).isRequired,
};

export default VerticalMenu;
