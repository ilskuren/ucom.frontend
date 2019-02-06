import { isEqual } from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { scroller } from 'react-scroll';

class VerticalMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeSectionName: null,
    };
  }

  componentDidMount() {
    this.setActiveSectionName(this.props.sections[0].name);
  }


  componentWillReceiveProps(props) {
    if (!isEqual(props.sections, this.props.sections)) {
      this.setActiveSectionName(props.sections[0].name);
    }

    this.setState({ activeSectionName: props.activeSectionName });
  }

  setActiveSectionName(activeSectionName) {
    this.setState({ activeSectionName });
  }

  changeActiveSection(sectionName) {
    scroller.scrollTo(sectionName, {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: -115,
    });
    this.setActiveSectionName(sectionName);
  }


  render() {
    return (
      <ul className={`vertical-menu ${this.props.sticky ? 'vertical-menu_sticky' : ''}`}>
        {this.props.sections.map(section => (
          <li
            key={section.name}
            className={classNames(
              'vertical-menu__section',
              { 'vertical-menu__section_active': section.name === this.state.activeSectionName },
            )}
            onClick={() => this.changeActiveSection(section.name)}
            role="presentation"
          >
            <span className="vertical-menu__type">{section.title}</span>
          </li>
        ))}
      </ul>
    );
  }
}

VerticalMenu.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default VerticalMenu;
