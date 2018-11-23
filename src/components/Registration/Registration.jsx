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

  activate() {
    if (!this.state.active && this.sectionsEl) {
      this.setState({ active: true });

      this.sectionsEl.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }

  render() {
    return (
      <LayotuPopup>
        <Popup>
          <ModalContent mod="registration">
            <div className="registration">
              <RegistrationStepIntro />

              <div
                role="presentation"
                ref={(el) => { this.sectionsEl = el; }}
                className={classNames(
                  'registration__sections',
                  { 'registration__sections_active': this.state.active },
                )}
                onClick={() => this.activate()}
              >
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
