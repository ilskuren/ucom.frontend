import React from 'react';
import { range } from 'lodash';

const RegistrationBrainkey = () => (
  <div className="registration-brainkey">
    {range(12).map(i => (
      <div className="registration-brainkey__item" key={i} data-index={i + 1}>monkey&nbsp;</div>
    ))}
  </div>
);

export default RegistrationBrainkey;
