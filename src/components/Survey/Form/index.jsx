import React from 'react';
import styles from './styles.css';
import TextareaAutosize from '../../TextareaAutosize';
import IconClose from '../../Icons/Close';

const Survey = () => (
  <div className={styles.survey}>
    <div className={styles.close}>
      <IconClose />
    </div>

    <TextareaAutosize
      placeholder="Your question"
      className={styles.title}
      rows={1}
    />

    <div className={styles.list}>
      <div className={styles.item}>
        <TextareaAutosize className={styles.question} />
      </div>
      <div className={styles.item}>
        <TextareaAutosize className={styles.question} />
      </div>
    </div>
  </div>
);

export default Survey;
