import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import React from 'react';

const LoadingScreen = props => (
  <CSSTransition
    in={props.loading}
    timeout={300}
    classNames="loading"
    unmountOnExit
  >
    <div className="loading" />
  </CSSTransition>
);

LoadingScreen.propTypes = {
  loading: PropTypes.bool,
};

export default LoadingScreen;
