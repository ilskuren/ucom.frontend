import React, { Fragment, useEffect } from 'react';
import Header from '../Header/Header';

const LayoutBase = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <Header />

      <div className="page__content">
        {props.children}
      </div>
    </Fragment>
  );
};

export default LayoutBase;
