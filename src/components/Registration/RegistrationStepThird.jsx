import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import Button from '../Button';
import TextInput from '../TextInput';
import Checkbox from '../Checkbox';
import { THIRD_STEP_ID, SECOND_STEP_ID, FIRST_BRAINKEY_STEP_ID } from '../../store/registration';
import { registrationSetStep, registrationSetBrainkeyStep } from '../../actions/registration';

const RegistrationStepThird = props => (
  <div
    className={classNames(
      'registration__section',
      'registration__section_third',
      { 'registration__section_active': props.registration.activeStepId === THIRD_STEP_ID },
    )}
  >
    <div className="registration__step">3/3</div>

    <div className="registration__title">
      <h3 className="title title_small">Verification</h3>
    </div>

    <div className="registration__content">
      <div className="registration__text">
        <div className="text">
          <p>
            Type in the words number 2 and 4 from your Brainkey.<br />
            If you didn&apos;t save your Brainkey,&nbsp;
            <span className="registration__link">
              <button
                className="button-clean button-clean_link"
                onClick={() => {
                  props.registrationSetStep(SECOND_STEP_ID);
                  props.registrationSetBrainkeyStep(FIRST_BRAINKEY_STEP_ID);
                }}
              >
                generate a new one
              </button>
            </span>.
          </p>
        </div>
      </div>

      <div className="registration-brainkey-verification">
        <div className="registration-brainkey">
          {props.registration.brainkey.split(' ').map((item, index) => (
            <Fragment key={index}>
              {index === 1 || index === 3 ? (
                <div className="registration-brainkey__item registration-brainkey__item_input">
                  <TextInput
                    ymDisableKeys
                    placeholder={`word ${index + 1}`}
                  />
                </div>
              ) : (
                <div className="registration-brainkey__item" data-index={index + 1}>{item}&nbsp;</div>
              )}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="registration-terms">
        <div className="registration-terms__item">
          <span className="inline">
            <span className="inline__item"><Checkbox /></span>
            <span className="inline__item">I accept the  General <a className="registration__link" href="#">Terms and Conditions.</a></span>
          </span>
        </div>
        <div className="registration-terms__item">
          <span className="inline">
            <span className="inline__item"><Checkbox /></span>
            <span className="inline__item">Allow to send anonymous usage data for developer.</span>
          </span>
        </div>
      </div>

      <div className="registration-footer">
        <div className="registration-footer__action">
          <Button
            isStretched
            isUpper
            size="big"
            theme="red"
            type="submit"
            text="Finish"
          />
        </div>
        <div className="registration-footer__error">
          Selected keywords don&apos;t match with entered on previous step.<br />Try check the order of your phrase.
        </div>
      </div>
    </div>
  </div>
);

export default connect(
  state => ({
    registration: state.registration,
  }),
  dispatch => bindActionCreators({
    registrationSetStep,
    registrationSetBrainkeyStep,
  }, dispatch),
)(RegistrationStepThird);
