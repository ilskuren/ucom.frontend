import React from 'react';
import Button from '../Button';

const Registration = () => (
  <div className="registration__section registration__section_second">
    <div className="registration__step">2/4</div>
    <h3 className="registration__title registration__title_medium">Brainkey</h3>

    <div className="registration__description">
      <p>Brainkey used for private keys generation and to restore them in case of loss.</p>
      <p>Write it down on a paper <span role="img" aria-label="Paper">📝</span>, make a photo <span role="img" aria-label="Photo">📷</span></p>
    </div>

    <div className="registration__brainkey">
      <div className="brainkey">
        <div className="brainkey__item">
          <div className="brainkey__number">1</div>
          <div className="brainkey__word">monkey</div>
        </div>
        <div className="brainkey__item">
          <div className="brainkey__number">2</div>
          <div className="brainkey__word">Trully</div>
        </div>
        <div className="brainkey__item">
          <div className="brainkey__number">3</div>
          <div className="brainkey__word">Sick</div>
        </div>
      </div>
    </div>

    <div className="registration__action">
      <Button
        isUpper
        size="big"
        theme="red"
        type="submit"
        text="Proceed"
      />
    </div>
  </div>
);

export default Registration;
