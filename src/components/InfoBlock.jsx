import React from 'react';

const InfoBLock = ({
  title, children,
}) => (
  <div className="info-block">
    <div className="info-block__title">{title}</div>
    { children }
  </div>
);

export default InfoBLock;
