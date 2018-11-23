import React, { Fragment } from 'react';
import Header from '../Header/Header';

const LayoutBase = props => (
  <Fragment>
    <Header />

    <div className="page__content">
      {props.children}
    </div>
  </Fragment>
);

export default LayoutBase;
