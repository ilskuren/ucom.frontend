import React from 'react';

const InfoBLock = ({
  label, children
}) => (
  <div className="info-block">
    <div className="info-block__label">{label}</div>
    { children }
  </div>
);

export default InfoBLock;
