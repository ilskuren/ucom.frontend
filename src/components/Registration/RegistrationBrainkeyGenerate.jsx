import React from 'react';
import { range } from 'lodash';

const RegistrationBrainkeyGenerate = () => (
  <div className="registration-brainkey-generate">
    <div className="registration-brainkey-generate__title">
      Move your pointer to generate the Brainkey
    </div>

    <div className="registration-brainkey-generate__progress" />

    <div className="registration-brainkey-generate__bytes">
      {range(12).map(i => <div key={i} className="registration-brainkey-generate__byte">9a</div>)}
    </div>
  </div>
);

export default RegistrationBrainkeyGenerate;
