import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Passphrase from '../components/Passphrase';
import Button from '../components/Button';
import TextInput from '../components/TextInput';

const passphraseWords = [
  'Monkey',
  'Trully',
  'Sick',
  'Sweet',
  'Snail',
  'Glitch',
  'Split',
  'Till',
  'Start',
  'While',
  'They',
  'Watching',
];

const words = [
  'Blind', 'Monkey', 'Fundle', 'Sweet', 'Also', 'Large', 'Banana', 'Till', 'End', 'When', 'You', 'Watching',
];

class SignUp extends React.PureComponent {
  state = {
    activeSection: 'username',
  };

  setActiveSection(section) {
    const { activeSection } = this.state;
    if (activeSection === section) {
      this.setState({ activeSection: null });
    } else {
      this.setState({ activeSection: section });
    }
  }

  render() {
    const { activeSection } = this.state;
    const { userNameFieldValue, userNameFieldError } = this.props;
    return (
      <div className="sign-up">
        <h1 className="sign-up__title">Account Creation</h1>
        <div className={cn('sign-up__section', { 'sign-up__section_active': activeSection === 'username' })}>
          <h3
            className="sign-up__section-title"
            onClick={() => this.setActiveSection('username')}
            role="presentation"
          >
            User Name
          </h3>
          <div className="sign-up__section-content">
            <div className="sign-up__username-hint">User name length must be between 3 and 12 characters</div>
            <div className="sign-up__username-input">
              <TextInput
                value={userNameFieldValue}
                error={userNameFieldError}
                placeholder="Username"
              />
            </div>
            <div className="sign-up__username-button">
              <Button
                isStretched
                isDisabled={!userNameFieldValue || userNameFieldError}
                text="PROCEED"
                size="big"
                theme={userNameFieldValue && !userNameFieldError ? 'red' : 'gray'}
              />
            </div>
          </div>
        </div>
        <div className={cn('sign-up__section', { 'sign-up__section_active': activeSection === 'passphrase' })}>
          <h3
            className="sign-up__section-title"
            onClick={() => this.setActiveSection('passphrase')}
            role="presentation"
          >
            Passphrase
          </h3>
          <div className="sign-up__section-content">34543</div>
        </div>
        <div className={cn('sign-up__section', { 'sign-up__section_active': activeSection === 'verification' })}>
          <h3
            className="sign-up__section-title"
            onClick={() => this.setActiveSection('verification')}
            role="presentation"
          >
            Verification
          </h3>
          <div className="sign-up__section-content">
            <Passphrase words={passphraseWords} isCrossOutMode />
          </div>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  userNameFieldValue: PropTypes.string,
  userNameFieldError: PropTypes.string,
};

SignUp.defaultProps = {
  userNameFieldValue: 'Ivan',
  userNameFieldError: 'server error',
};

export default SignUp;
