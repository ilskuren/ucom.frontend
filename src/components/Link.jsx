import React from 'react';
import PropTypes from 'prop-types';

const Link = props => <a className="link" href={props.href} target={props.target}>{props.children || props.href}</a>;

Link.propTypes = {
  children: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  target: PropTypes.string,
};

export default Link;
