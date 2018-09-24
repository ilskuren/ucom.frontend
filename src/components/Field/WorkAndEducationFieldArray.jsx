import React, { PureComponent } from 'react';
import { FieldArray } from 'redux-form';
import Education from '../Education';
import Jobs from '../Jobs';

class WorkAndEducationFieldArrayWrapper extends PureComponent {
  render() {
    const { componentName } = this.props;
    switch (componentName) {
      case 'educations':
        return <Education {...this.props} />;
      case 'jobs':
        return <Jobs {...this.props} />;
      default:
        throw new Error('Unreachable code', componentName);
    }
  }
}

export default function WorkAndEducationFieldArray(props) {
  return <FieldArray {...props} component={WorkAndEducationFieldArrayWrapper} format={props.formatter} />;
}
