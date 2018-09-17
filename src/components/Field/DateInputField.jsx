import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import DateInput from '../../components/DateInput';

class DateInputFieldWrapper extends PureComponent {
  render() {
    const { input } = this.props;
    return (
      <DateInput {...input} label={this.props.label} />
    );
  }
}

export default function DateInputField(props) {
  return <Field {...props} component={DateInputFieldWrapper} />;
}
