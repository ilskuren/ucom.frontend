import { KEY_ESCAPE, KEY_RETURN } from 'keycode-js';
import React, { useState, useEffect } from 'react';
import Button from '../../Button';

import { PLACEHOLDER, STATUS_MAX_LENGTH } from './UserStatus';

const UserStatusForm = (props) => {
  let element;
  const [moodMessage, setMoodMessage] = useState(props.moodMessage || '');

  const hideFormOnClick = (e) => {
    if (!element) {
      return;
    }

    if (!element.contains(e.target)) {
      props.onClickHide();
    }
  };

  useEffect(() => {
    document.addEventListener('click', hideFormOnClick);

    return () => {
      document.removeEventListener('click', hideFormOnClick);
    };
  });

  const save = () => {
    props.onClickSave(moodMessage);
    props.onClickHide();
  };

  return (
    <div className="status__form" ref={(el) => { element = el; }}>
      <textarea
        autoFocus
        rows="2"
        className="status__textarea"
        placeholder={PLACEHOLDER}
        maxLength={STATUS_MAX_LENGTH}
        value={moodMessage}
        onChange={e => setMoodMessage(e.target.value)}
        onKeyUp={(e) => {
          if (e.keyCode === KEY_ESCAPE) {
            props.onClickHide();
          }

          if (e.keyCode === KEY_RETURN && (e.ctrlKey || e.metaKey)) {
            save();
          }
        }}
      />

      <div className="status__actions">
        <Button
          text="Save"
          size="small"
          theme="transparent"
          onClick={() => save()}
        />

        <div className="status__counter">
          {moodMessage.length}/{STATUS_MAX_LENGTH}
        </div>
      </div>
    </div>
  );
};

export default UserStatusForm;
