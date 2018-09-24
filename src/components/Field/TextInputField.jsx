import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import TextInput from '../TextInput';

class TextInputFieldWrapper extends PureComponent {
  render() {
    const { input, meta: { error, touched }, subtext } = this.props;
    return (
      <TextInput {...input} label={this.props.label} error={error} touched={touched} subtext={subtext} />
    );
  }
}

export default function TextInputField(props) {
  return <Field {...props} component={TextInputFieldWrapper} format={props.formatter} />;
}
