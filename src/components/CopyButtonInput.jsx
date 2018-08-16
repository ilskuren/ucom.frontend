import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';

const CopyButtonInput = ({
  value,
}) => (
  <div className="copy-button-input">
    <div className="copy-button-input__text">
      {value}
    </div>
    <CopyToClipboard text={value} >
      <div className="copy-button-input__button">Copy</div>
    </CopyToClipboard>
  </div>
);

CopyButtonInput.propTypes = {
  value: PropTypes.string,
};

export default CopyButtonInput;
