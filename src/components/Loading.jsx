import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import React from 'react';

const LoadingScreen = props => (
  <CSSTransition
    appear={props.appear}
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
  appear: PropTypes.bool,
};

export default LoadingScreen;
