import React from 'react';
import PropTypes from 'prop-types';

const PersonForm = props => <form className="person-form">{props.children}</form>;

PersonForm.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PersonForm;
