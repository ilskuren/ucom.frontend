import React from 'react';

const RegistrationAccountInfo = () => (
  <div className="registration-account-info">
    <div className="registration-account-info__section">
      <div className="registration-account-info__title">12</div>
      <div className="registration-account-info__description">Must be <strong>12 characters</strong></div>
    </div>

    <div className="registration-account-info__section">
      <div className="registration-account-info__title">a <strike><span>A</span></strike></div>
      <div className="registration-account-info__description">Must be <strong>lowercase</strong> only</div>
    </div>

    <div className="registration-account-info__section">
      <div className="registration-account-info__title">1-5</div>
      <div className="registration-account-info__description">Can only have <strong>numbers 1–5</strong></div>
    </div>
  </div>
);

export default RegistrationAccountInfo;
