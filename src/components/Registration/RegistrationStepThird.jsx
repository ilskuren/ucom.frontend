import React from 'react';
import Button from '../Button';
import RegistrationBrainkeyGenerate from './RegistrationBrainkeyGenerate';
import RegistrationBrainkey from './RegistrationBrainkey';
import Popup from '../Popup';
import ModalContent from '../ModalContent';

class Registration extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      brainkeyPopupVisible: false,
    };
  }

  render() {
    return (
      <div className="registration__section registration__section_third">
        <div className="registration__step">2/3</div>

        <div className="registration__title registration__title_medium">
          <h3 className="title title_small">Brainkey</h3>
        </div>

        {/* <div className="registration__text">
          <div className="text">
            <p>The Brainkey is the seed phrase from which your public-private key pairs are generated. You can restore the public-private key pairs from your Brainkey if you lose the keys.</p>
            <p><strong>The Brainkey itself cannot be restored once lost!</strong></p>
          </div>
        </div>

        <div className="registration__action">
          <Button
            isStretched
            isUpper
            size="big"
            theme="red"
            type="submit"
            text="Generate"
          />
        </div> */}

        {/* <div className="registration__text">
          <div className="text">
            <p>Always keep your Brainkey secure. Never lose it.</p>
          </div>
        </div>

        <RegistrationBrainkeyGenerate /> */}

        <div className="registration__text">
          <div className="text">
            <p>Write it down on a paper <span role="img" aria-label="Paper">📝</span>, make a photo <span role="img" aria-label="Photo">📷</span></p>
          </div>
        </div>

        <RegistrationBrainkey />

        {/* <div className="registration__action">
          <Button
            isStretched
            isUpper
            size="big"
            theme="red"
            type="submit"
            text="Proceed"
            onClick={() => this.setState({ brainkeyPopupVisible: true })}
          />
        </div> */}

        <div className="registration__action registration__action_fluid">
          <Button
            isUpper
            size="big"
            theme="red"
            type="submit"
            text="I’ve saved it, Proceed"
            onClick={() => this.setState({ brainkeyPopupVisible: true })}
          />
        </div>

        {this.state.brainkeyPopupVisible &&
          <Popup onClickClose={() => this.setState({ brainkeyPopupVisible: false })}>
            <ModalContent mod="brainkey-info">
              <div className="registration__title registration__title_medium">
                <h3 className="title title_small">The Brainkey cannot be restored if lost</h3>
              </div>

              <div className="registration__text">
                <div className="text">
                  <p>Write down or memorize your Brainkey. The Brainkey is your access to your account. <strong>It can’t be restored</strong></p>
                </div>
              </div>

              <div className="registration__action">
                <Button
                  isStretched
                  isUpper
                  size="big"
                  theme="red"
                  type="submit"
                  text="Got it"
                  onClick={() => this.setState({ brainkeyPopupVisible: false })}
                />
              </div>
            </ModalContent>
          </Popup>
        }
      </div>
    );
  }
}

export default Registration;
