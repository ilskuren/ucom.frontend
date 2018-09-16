import React, { PureComponent } from 'react';
import { FieldArray } from 'redux-form';
import SocialNetworks from '../../components/SocialNetworks';

class SocialNetworksFieldArrayWrapper extends PureComponent {
  render() {
    return (
      <SocialNetworks {...this.props} />
    );
  }
}

export default function SocialNetworksFieldArray(props) {
  return <FieldArray component={SocialNetworksFieldArrayWrapper} {...props} />;
}
