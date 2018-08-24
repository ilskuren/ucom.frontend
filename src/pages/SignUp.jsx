import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

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
    const { userName, userNameError } = this.props;
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
            <div className="sign-up__username-input">
              <TextInput
                value={userName}
                error={userNameError}
                label="User name length must be between 3 and 12 characters"
                placeholder="Username"
                inputMaxWidth="400px"
              />
            </div>
            <div className="sign-up__username-button">
              <Button
                isStretched
                isDisabled={!userName || userNameError}
                text="PROCEED"
                size="big"
                theme={userName && !userNameError ? 'red' : 'gray'}
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
          <div className="sign-up__section-content">Passphrase form</div>
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

SignUp.propTypes = {
  userName: PropTypes.string,
  userNameError: PropTypes.string,
};

SignUp.defaultProps = {
  userName: 'Ivan',
  userNameError: 'server error',
};

export default SignUp;
