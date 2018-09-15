import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import TextInput from '../TextInput';

class TextInputFieldWrapper extends PureComponent {
  render() {
    const { input, subtext } = this.props;
    return (
      <TextInput {...input} label={this.props.label} subtext={subtext} />
    );
  }
}

export default function TextInputField(props) {
  return <Field {...props} component={TextInputFieldWrapper} format={props.formatter} />;
}
