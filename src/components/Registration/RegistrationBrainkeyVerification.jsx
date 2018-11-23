import { random } from 'lodash';
import React, { PureComponent, Fragment } from 'react';
import TextInput from '../TextInput';

class RegistrationBrainkeyVerification extends PureComponent {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      verificationWordsIndexes: [random(0, 5), random(6, 11)],
      verificationWords: ['', ''],
    };
  }

  componentWillReceiveProps(props) {
    if (props.brainkey !== this.props.brainkey) {
      this.setState(this.getInitialState());
    }
  }

  getVerificationWord(index) {
    const arrayIndex = this.state.verificationWordsIndexes.indexOf(index);

    return this.state.verificationWords[arrayIndex];
  }

  setVerificationWord(index, word) {
    const arrayIndex = this.state.verificationWordsIndexes.indexOf(index);
    const verificationWords = [].concat(this.state.verificationWords);

    verificationWords[arrayIndex] = word;
    this.setState({ verificationWords }, () => this.validate());
  }

  validate() {
    const isComplete = this.state.verificationWords.every(i => i.length > 0);
    const isValid = this.state.verificationWordsIndexes
      .map((index, i) => (
        this.props.brainkey.split(' ')[index] === this.state.verificationWords[i]
      ))
      .every(i => Boolean(i));

    this.props.onComplete(isComplete);
    this.props.onChange(isValid);
  }

  render() {
    return (
      <div className="registration-brainkey-verification">
        <div className="registration-brainkey">
          {this.props.brainkey.split(' ').map((item, index) => (
            <Fragment key={index}>
              {this.state.verificationWordsIndexes.indexOf(index) > -1 ? (
                <div className="registration-brainkey__item registration-brainkey__item_input">
                  <TextInput
                    ymDisableKeys
                    placeholder={`word ${index + 1}`}
                    value={this.getVerificationWord(index)}
                    onChange={value => this.setVerificationWord(index, value)}
                  />
                </div>
              ) : (
                <div className="registration-brainkey__item" data-index={index + 1}>{item}&nbsp;</div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    );
  }
}

export default RegistrationBrainkeyVerification;
