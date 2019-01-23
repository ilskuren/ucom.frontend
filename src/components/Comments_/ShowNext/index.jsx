import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';

const ShowNext = ({
  page, perPage, onClick, postId,
}) => (
  <div className={styles.showNext}>
    <div
      role="presentation"
      className={styles.inner}
      onClick={() => onClick({
        perPage,
        postId,
        page: page + 1,
      })}
    >
      Show {perPage} next comments
    </div>
  </div>
);

ShowNext.propTypes = {
  postId: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ShowNext;
