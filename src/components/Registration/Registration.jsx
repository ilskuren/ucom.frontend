import classNames from 'classnames';
import React, { PureComponent } from 'react';
import Popup from '../Popup';
import RegistrationStepIntro from './RegistrationStepIntro';
import RegistrationStepFirst from './RegistrationStepFirst';
import RegistrationStepSecond from './RegistrationStepSecond';
import RegistrationStepThird from './RegistrationStepThird';
import ModalContent from '../ModalContent';
import LayotuPopup from '../Layout/LayoutPopup';

class Registration extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  render() {
    return (
      <LayotuPopup>
        <Popup>
          <ModalContent
            mod="registration"
            onClickClose={() => {
              window.history.back();
            }}
          >
            <div className="registration">

              <div
                role="presentation"
                ref={(el) => { this.sectionsEl = el; }}
                className={classNames(
                  'registration__sections',
                  { 'registration__sections_active': this.state.active },
                )}
              >
                <RegistrationStepIntro />
                <RegistrationStepFirst />
                <RegistrationStepSecond />
                <RegistrationStepThird />
              </div>
            </div>
          </ModalContent>
        </Popup>
      </LayotuPopup>
    );
  }
}

export default Registration;
