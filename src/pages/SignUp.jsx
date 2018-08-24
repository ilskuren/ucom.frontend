import React from 'react';
import cn from 'classnames';
import Button from '../components/Button';

const words = [
  'Blind', 'Monkey', 'Fundle', 'Sweet', 'Also', 'Large', 'Banana', 'Till', 'End', 'When', 'You', 'Watching',
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
          <div className="sign-up__section-content">
            <div className="sign-up__section-text">
              This 12 words is your passphrase. Write them down  and remember.
            </div>
            <div className="sign-up__words">
              {words.map(word => (
                <span className="sign-up__word">{word}</span>
              ))}
            </div>
            <div className="sign-up__button-block">
              <div className="sign-up__button">
                <Button
                  isStretched
                  text="COPY & DOWNLOAD"
                  size="big"
                  theme="red"
                />
              </div>
              <div className="sign-up__button-text">
                Please, copy or download your passphrase to proceed
              </div>
            </div>
          </div>
        </div>
        <div className={cn('sign-up__section', { 'sign-up__section_active': activeSection === 'verification' })}>
          <h3
            className="sign-up__section-title"
            onClick={() => this.setActiveSection('verification')}
            role="presentation"
          >
            Verification
          </h3>
          <div className="sign-up__section-content">Verification form</div>
        </div>
      </div>
    );
  }
}

export default SignUp;
