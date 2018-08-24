import React from 'react';
import cn from 'classnames';
import Passphrase from '../components/Passphrase';

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

class SignUp extends React.PureComponent {
  state = {
    activeSection: null,
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
          <div className="sign-up__section-content">UserName form</div>
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

export default SignUp;
