import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Checkbox from '../components/Checkbox';
import Passphrase from '../components/Passphrase';

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

class AccountCreationSection {
  static renderText({ title, mainText, clickHandler }) {
    return (
      <Fragment>
        <h3 className="sign-up__title" onClick={clickHandler} role="presentation">{title}</h3>
        <div className="sign-up__text" dangerouslySetInnerHTML={{ __html: mainText }} />
      </Fragment>
    );
  }
  static renderContent(content, modifier) {
    return (
      <div
        className={cn('sign-up__content', {
            [`sign-up__content_${modifier}`]: Boolean(modifier),
          })}
      >
        {content}
      </div>
    );
  }
  static renderSubmitSection({ button, description }) {
    const {
      text,
      isDisabled,
      theme,
      size,
      isStretched,
    } = button;

    return (
      <Fragment>
        <div className="sign-up__submit-section">
          <div className="sign-up__submit-section-button">
            <Button
              isStretched={isStretched || false}
              isDisabled={isDisabled}
              text={text || 'default'}
              size={size || 'big'}
              theme={theme}
            />
          </div>
          { description && <div className="sign-up__submit-section-description">{description}</div> }
        </div>
      </Fragment>
    );
  }
}
class SignUp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderSection = this.renderSection.bind(this);
  }

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

  renderSection({
    sectionName,
    text: { title, mainText },
    clickHandler,
    content: { content, modifier },
    submitData: { button, description },
  }) {
    const { activeSection } = this.state;
    return (
      <div className={cn('sign-up__section', { 'sign-up__section_active': activeSection === sectionName })} >
        {
          AccountCreationSection.renderText({
            title,
            clickHandler,
            mainText,
          })
        }
        {
          AccountCreationSection.renderContent(content, modifier)
        }
        {
          AccountCreationSection.renderSubmitSection({
            button,
            description,
          })
        }
      </div>
    );
  }

  render() {
    const { userNameFieldValue, userNameFieldError } = this.props;
    return (
      <div className="sign-up">
        <div className="sign-up__main-title">
          Account Creation
        </div>

        {
          this.renderSection({
          sectionName: 'username',
          text: {
            title: 'User Name',
            mainText: 'User name length must be between 3 and 12 characters',
          },
          clickHandler: () => this.setActiveSection('username'),
          content: {
            content: (
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
          })
        }

        {
          this.renderSection({
          sectionName: 'passphrase',
          text: {
            title: 'Passphrase',
            mainText: 'This 12 word is your passphrase. Write them down and remember',
          },
          clickHandler: () => this.setActiveSection('passphrase'),
          content: {
            content: <Passphrase words={passphraseWords} />,
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
          })
        }

        {
          this.renderSection({
          sectionName: 'verification',
          text: {
            title: 'Verification',
            mainText: 'Cross out words number <b>2</b>, <b>4</b>, <b>8</b> and <b>12</b> from your passphrase out to validate the account creation',
          },
          clickHandler: () => this.setActiveSection('verification'),
          content: {
            content: (
              <Fragment>
                <Passphrase words={verificationWords} isCrossOutMode />
                <div className="sign-up__accept">
                  <Checkbox />
                  <div className="sign-up__accept-text">I accept the <a className="sign-up__accept-terms" href="#">General Terms and Conditions.</a></div>
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
          })
        }
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
