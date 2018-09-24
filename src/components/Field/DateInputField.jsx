import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import DateInput from '../../components/DateInput';

class DateInputFieldWrapper extends PureComponent {
  render() {
    const { input, meta: { error, touched } } = this.props;
    return (
      <DateInput {...input} label={this.props.label} touched={touched} error={error} />
    );
  }
}

export default function DateInputField(props) {
  return <Field {...props} component={DateInputFieldWrapper} />;
}
