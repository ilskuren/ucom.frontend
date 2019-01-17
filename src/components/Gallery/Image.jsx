import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';

const Image = props => (
  <div className={styles.imageWrapper}>
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
};

export default Image;
