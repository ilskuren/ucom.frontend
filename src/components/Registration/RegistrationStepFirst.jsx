import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import Button from '../Button';
import RegistrationAccountInfo from './RegistrationAccountInfo';
import RegistrationAccountField from './RegistrationAccountField';
import { FIRST_STEP_ID, SECOND_STEP_ID } from '../../store/registration';
import { registrationSetStep } from '../../actions/registration';

const RegistrationStepFirst = props => (
  <div
    className={classNames(
      'registration__section',
      'registration__section_first',
      { 'registration__section_active': props.registration.activeStepId === FIRST_STEP_ID },
    )}
  >
    <div className="registration__step">1/3</div>

    <div className="registration__title">
      <h3 className="title title_small">
        {props.registration.activeStepId === FIRST_STEP_ID ? (
          <Fragment>Choose Account Name</Fragment>
        ) : (
          <Fragment>Account Name: @{props.registration.accountName}</Fragment>
        )}
      </h3>
    </div>

    <div className="registration__content">
      <RegistrationAccountInfo />
      <RegistrationAccountField />

      <div className="registration__action">
        <Button
          isStretched
          isUpper
          isDisabled={!props.registration.accountNameIsValid}
          size="big"
          theme="red"
          type="submit"
          text="Proceed"
          onClick={() => props.registrationSetStep(SECOND_STEP_ID)}
        />
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
  }, dispatch),
)(RegistrationStepFirst);
