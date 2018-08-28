import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../components/TextInput';
import Checkbox from '../components/Checkbox';
import Passphrase from '../components/Passphrase';
import SignUpSection from '../components/SignUpSection';

const verificationWords = [
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

const passphraseWords = [
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
    const { userNameFieldValue, userNameFieldError } = this.props;

    const sectionsData = [
      {
        name: 'username',
        text: {
          title: 'User Name',
          handleTitleClick: () => this.setActiveSection('username'),
          mainText: 'User name length must be between 3 and 12 characters',
        },
        content: {
          body: (
            <div className="sign-up__username-input">
              <TextInput
                value={userNameFieldValue}
                error={userNameFieldError}
                placeholder="Username"
              />
            </div>
          ),
          modifier: 'user-name',
        },
        submitData: {
          button: {
            text: 'PROCEED',
            isStretched: true,
            isDisabled: Boolean(!userNameFieldValue || userNameFieldError),
            size: 'big',
            theme: userNameFieldValue && !userNameFieldError ? 'red' : 'gray',
          },
        },
      },

      {
        name: 'passphrase',
        text: {
          title: 'Passphrase',
          handleTitleClick: () => this.setActiveSection('passphrase'),
          mainText: 'This 12 word is your passphrase. Write them down and remember',
        },
        content: {
          body: <Passphrase words={passphraseWords} />,
          modifier: 'passphrase',
        },
        submitData: {
          button: {
            text: 'COPY & DOWNLOAD',
            isStretched: true,
            isDisabled: false,
            size: 'big',
            theme: 'red',
          },
          description: 'Please, copy or download your passphrase to proceed',
        },
      },

      {
        name: 'verification',
        text: {
          title: 'Verification',
          handleTitleClick: () => this.setActiveSection('verification'),
          mainText: 'Cross out words number <b>2</b>, <b>4</b>, <b>8</b> and <b>12</b> from your passphrase out to validate the account creation',
        },
        content: {
          body: (
            <Fragment>
              <Passphrase words={verificationWords} isCrossOutMode />
              <div className="sign-up__agreement">
                <Checkbox />
                <div className="sign-up__agreement-text">I accept the <a className="sign-up__agreement-conditions" href="#">General Terms and Conditions.</a></div>
              </div>
            </Fragment>
          ),
          modifier: 'verification',
        },
        submitData: {
          button: {
            text: 'FINISH',
            isStretched: true,
            isDisabled: false,
            size: 'big',
            theme: 'red',
          },
        },
      },
    ];

    return (
      <div className="sign-up">
        <div className="sign-up__main-title">
          Account Creation
        </div>
        {sectionsData.map(({
            name, text, submitData, content,
        }, sectionNumber) => (
          <SignUpSection
            key={sectionNumber}
            name={name}
            text={text}
            submitData={submitData}
            activeSection={this.state.activeSection}
            modifier={content.modifier}
          >
            {content.body}
          </SignUpSection>
        ))}
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
