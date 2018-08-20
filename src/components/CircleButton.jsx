import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import IconPlus from './Icons/Plus';
// import Avatar from './Avatar';

const CircleButton = props => (
  <button className="circle-button">
    <IconPlus fillColor="#d8352f" />
    {
      props.src &&
        <img src={props.src} alt="img" className="circle-button__img" />
    }
  </button>
);

CircleButton.propTypes = {
  src: PropTypes.string,
};

export default CircleButton;
