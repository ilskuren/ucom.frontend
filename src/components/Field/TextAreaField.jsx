import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import Textarea from '../Textarea';

class TextAreaFieldFieldWrapper extends PureComponent {
  render() {
    const { input } = this.props;
    return (
      <Textarea {...input} label={this.props.label} rows={this.props.rows} />
    );
  }
}

export default function TextAreaField(props) {
  return <Field {...props} component={TextAreaFieldFieldWrapper} format={props.formatter} />;
}
