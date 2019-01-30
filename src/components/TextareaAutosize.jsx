import autosize from 'autosize';
import React, { useEffect, useRef } from 'react';

const TextareaAutosize = (props) => {
  const textareaEl = useRef(null);

  useEffect(() => {
    autosize(textareaEl.current);

    return () => {
      autosize.destroy(textareaEl);
    };
  }, []);

  useEffect(() => {
    autosize.update(textareaEl.current);
  }, [props.value]);

  return (
    <textarea ref={textareaEl} {...props} />
  );
};

export default TextareaAutosize;
