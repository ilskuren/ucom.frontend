import PropTypes from 'prop-types';
import React from 'react';
import Button from './Button';

const ShareButton = props => (
  <Button
    isStretched
    size="medium"
    theme="transparent"
    text="Share"
    onClick={() => props.toggleShare()}
  />
);

ShareButton.propTypes = {
  toggleShare: PropTypes.func,
};

export default ShareButton;
