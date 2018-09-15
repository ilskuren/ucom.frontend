import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import TextInput from '../TextInput';

class TextInputFieldWrapper extends PureComponent {
  render() {
    const { input, meta: { error } } = this.props;
    return (
      <TextInput {...input} label={this.props.label} error={error} />
    );
  }
}

export default function TextInputField(props) {
  return <Field {...props} component={TextInputFieldWrapper} format={props.formatter} />;
}
