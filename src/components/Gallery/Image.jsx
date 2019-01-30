import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';

const Image = props => (
  <div
    role="presentation"
    className={styles.imageWrapper}
    onClick={() => props.onClick && props.onClick()}
  >
    <img className={styles.image} src={props.src} alt={props.alt} />
    {props.label &&
      <span className={styles.label}>{props.label}</span>
    }
  </div>
);

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
};

export default Image;
