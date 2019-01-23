import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';

const ShowReplies = props => (
  <div className={styles.showReplies} depth={props.depth}>
    <div className={styles.icon}>
      <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 0V7.21812H12M12 7.21812L8.5 4M12 7.21812L8.5 10.2062" stroke="#C4C4C4" />
      </svg>
    </div>
    <div
      role="presentation"
      className={styles.title}
      onClick={() => props.onClick({
        postId: props.postId,
        parentId: props.parentId,
        parentDepth: props.parentDepth,
        page: props.page,
      })}
    >
      Show {props.count} {props.showNext && 'next'} replies
    </div>
  </div>
);

ShowReplies.propTypes = {
  depth: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
  parentId: PropTypes.number.isRequired,
  parentDepth: PropTypes.number.isRequired,
  page: PropTypes.number,
  showNext: PropTypes.bool,
  count: PropTypes.number,
};

ShowReplies.defaultProps = {
  depth: 0,
  page: 1,
  count: 10,
  showNext: false,
};

export default ShowReplies;
