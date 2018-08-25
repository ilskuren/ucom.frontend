import React from 'react';
import PropTypes from 'prop-types';

const Passphrase = ({ isCrossOutMode, words }) => (
  <div className="passphrase">
    {
      words.map((word, positionInList) => {
        const bindId = word.toLowerCase() + positionInList;
        return (
          <span className="passphrase__word" key={word}>
            <input
              id={bindId}
              className={isCrossOutMode ? 'passphrase__checkbox' : 'passphrase__word-value'}
              name="passphrase"
              type={isCrossOutMode ? 'checkbox' : 'button'}
              readOnly={!isCrossOutMode}
              value={word}
            />
            <label htmlFor={bindId} className="passphrase__label">{word}</label>
          </span>
        );
      })
    }
  </div>
);

Passphrase.propTypes = {
  isCrossOutMode: PropTypes.bool,
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Passphrase;
