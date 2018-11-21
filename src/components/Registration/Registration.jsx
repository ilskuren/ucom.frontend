import React from 'react';
import Popup from '../Popup';
import RegistrationStepIntro from './RegistrationStepIntro';
import RegistrationStepFirst from './RegistrationStepFirst';
import RegistrationStepSecond from './RegistrationStepSecond';
import RegistrationStepThird from './RegistrationStepThird';
import ModalContent from '../ModalContent';
import LayotuPopup from '../Layout/LayoutPopup';

const Registration = () => (
  <LayotuPopup>
    <Popup>
      <ModalContent>
        <div className="registration">
          <RegistrationStepIntro />
          <RegistrationStepFirst />
          <RegistrationStepSecond />
          <RegistrationStepThird />
        </div>
      </ModalContent>
    </Popup>
  </LayotuPopup>
);

export default Registration;
