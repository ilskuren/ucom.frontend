import React from 'react';
import PropTypes from 'prop-types';
import Link from './Link';
import InputError from './Icons/InputError';

const KYC = props => (
  <div className="kyc">
    <span className="kyc__title">{props.title}</span>
    <span className="kyc__status-icon"><InputError /></span>
    {props.link && <Link href={props.link}>Proceed to verification</Link>}
  </div>
);

KYC.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
};

export default KYC;
