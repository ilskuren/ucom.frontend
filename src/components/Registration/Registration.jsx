import React from 'react';
import Popup from '../Popup';
import RegistrationStepFirst from './RegistrationStepFirst';
import RegistrationStepSecond from './RegistrationStepSecond';
import RegistrationStepThird from './RegistrationStepThird';

const Registration = () => (
  <Popup>
    <div className="registration">
      <RegistrationStepFirst />
      <RegistrationStepSecond />
      <RegistrationStepThird />
    </div>
  </Popup>
);

export default Registration;
