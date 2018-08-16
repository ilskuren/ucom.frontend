import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';
import Button from './Button';

const InputWithCopy = ({
  value,
}) => (
  <div className="input-with-copy">
    <div className="input-with-copy__text">
      {value}
    </div>
    <div className="input-with-copy__button">
      <CopyToClipboard text={value} >
        <Button text="Copy" theme="red" size="medium" isStretched />
      </CopyToClipboard>
    </div>
  </div>
);

InputWithCopy.propTypes = {
  value: PropTypes.string,
};

export default InputWithCopy;
