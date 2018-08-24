import React from 'react';
import PropTypes from 'prop-types';

const Passphrase = ({ isCrossOutMode, words }) => (
  <div className="passphrase">
    {
      words.map(word => (
        <span className="passphrase__word" key={word}>
          <input
            id={word}
            className="passphrase__checkbox"
            name="passphrase"
            type={isCrossOutMode ? 'checkbox' : 'button'}
            readOnly={!isCrossOutMode}
            value={word}
          />
          <label htmlFor={word} className="passphrase__label">{word}</label>
        </span>
        ))
    }
  </div>
);

Passphrase.propTypes = {
  isCrossOutMode: PropTypes.bool,
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Passphrase;
