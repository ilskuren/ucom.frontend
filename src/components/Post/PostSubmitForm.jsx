import React from 'react';
import TextareaAutosize from '../TextareaAutosize';

export default () => (
  <div className="post-submit-form">
    <div className="post-submit-form__title">
      <h3 className="title title_light title_small">Post preview</h3>
    </div>

    {/* <div className="post-submit-form__cover">
      <input type="input" />
    </div> */}

    <div className="post-submit-form__field">
      <TextareaAutosize
        rows="1"
        placeholder="Preview title"
        className="post-submit-form__data"
      />
    </div>

    <div className="post-submit-form__field">
      <TextareaAutosize
        rows="1"
        placeholder="Preview sub title"
        className="post-submit-form__data"
      />
    </div>
  </div>
);
