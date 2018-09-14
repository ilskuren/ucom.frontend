import React, { PureComponent } from 'react';
import { bind } from 'decko';
import { FieldArray } from 'redux-form';
import SocialNetworks from '../../components/SocialNetworks';

class SocialNetworksFieldArrayWrapper extends PureComponent {
  @bind
  onChange(value) {
    const { input: { onChange } } = this.props;
    onChange({
      value,
    });
  }

  render() {
    return (
      <SocialNetworks {...this.props} />
    );
  }
}

export default function SocialNetworksFieldArray(props) {
  return <FieldArray component={SocialNetworksFieldArrayWrapper} {...props} />;
}
