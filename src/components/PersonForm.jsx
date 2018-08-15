import React from 'react';
import PropTypes from 'prop-types';

const PersonForm = props => <div className="person-form">{props.children}</div>;

PersonForm.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PersonForm;
