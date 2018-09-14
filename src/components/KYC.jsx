import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Link from './Link';
import InputError from './Icons/InputError';

const KYC = props => (
  <div className={cn('kyc', props.className)}>
    <span className="kyc__title">{props.title}</span>
    <span className="kyc__status-icon"><InputError /></span>
    {props.link && <Link href={props.link}>Proceed to verification</Link>}
  </div>
);

KYC.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  className: PropTypes.string,
};

export default KYC;
