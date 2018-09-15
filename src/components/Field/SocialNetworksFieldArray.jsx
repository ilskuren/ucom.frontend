import React, { PureComponent } from 'react';
import { FieldArray } from 'redux-form';
import SocialNetworks from '../../components/SocialNetworks';

class SocialNetworksFieldArrayWrapper extends PureComponent {
  render() {
    const { meta: { error } } = this.props;
    return (
      <SocialNetworks {...this.props} />
    );
  }
}

export default function SocialNetworksFieldArray(props) {
  return <FieldArray component={SocialNetworksFieldArrayWrapper} {...props} />;
}
