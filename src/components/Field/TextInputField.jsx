import React, { PureComponent } from 'react';
import { bind } from 'decko';
import { Field } from 'redux-form';
import TextInput from '../TextInput';

class TextInputFieldWrapper extends PureComponent {
  render() {
    const { input } = this.props;
    return (
      <TextInput {...input} label={this.props.label} />
    );
  }
}

export default function TextInputField(props) {
  return <Field {...props} component={TextInputFieldWrapper} format={props.formatter} />;
}
