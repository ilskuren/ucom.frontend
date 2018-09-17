import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bind } from 'decko';
import TextInput from './TextInput';
import DateInput from './DateInput';
import Button from './Button';

class Education extends PureComponent {
  @bind
  testmethod() {

  }

  render() {
    return (
      <div className="list__item">
        <div className="profile__block">
          <TextInput
            label="Education"
          />
        </div>
        <div className="profile__block">
          <TextInput
            label="Spec"
          />
        </div>
        <div className="profile__block">
          <TextInput
            label="Level"
          />
        </div>
        <div className="profile__block">
          <DateInput
            label="Started date"
          />
        </div>
        <div className="profile__block">
          <DateInput
            label="Ended date"
          />
        </div>
        <div className="profile__block">
          <Button
            theme="transparent"
            size="small"
            text="Remove"
          />
        </div>
      </div>
    );
  }
}

Education.propTypes = {
  fields: PropTypes.shape({
    length: PropTypes.number,
  }),
};

export default Education;
