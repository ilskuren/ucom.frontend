import React, { PureComponent } from 'react';
import { FieldArray } from 'redux-form';
import Education from '../Education';

class WorkAndEducationFieldsArrayWrapper extends PureComponent {

  render() {
    return (
      <Education />
    );
  }
}

export default function WorkAndEducationFieldsArray(props) {
  return <FieldArray {...props} component={WorkAndEducationFieldsArrayWrapper} format={props.formatter} />;
}
