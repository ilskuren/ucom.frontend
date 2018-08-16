import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';

const InputWithCopy = ({
  value,
}) => (
  <div className="input-with-copy">
    <div className="input-with-copy__text">
      {value}
    </div>
    <CopyToClipboard text={value} >
      <div className="input-with-copy__button">Copy</div>
    </CopyToClipboard>
  </div>
);

InputWithCopy.propTypes = {
  value: PropTypes.string,
};

export default InputWithCopy;
