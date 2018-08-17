import React from 'react';
import Link from './Link';
import InputError from './Icons/InputError';

const KYC = () => (
  <div className="kyc">
    <span className="kyc__title">Not verified</span>
    <span className="kyc__status-icon"><InputError /></span>
    <Link href="#">Proceed to verification</Link>
  </div>
);

export default KYC;
