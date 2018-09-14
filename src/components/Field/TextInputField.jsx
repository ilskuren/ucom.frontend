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

function formatValue(value, name) {
  if (typeof value === 'object') {
    return value.sourceUrl;
  }
  return value;
}

export default function TextInputField(props) {
  return <Field {...props} component={TextInputFieldWrapper} format={formatValue} />;
}
