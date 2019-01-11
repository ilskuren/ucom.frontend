import React from 'react';
import TextareaAutosize from '../TextareaAutosize';

export default () => (
  <div className="post-submit-form">
    <div className="post-submit-form__title">
      <h3 className="title title_small">Post preview</h3>
    </div>

    <div className="post-submit-form__cover">
      <div className="post-submit-cover">
        <label className="post-submit-cover__inner">
          <div className="post-submit-cover__text">Click for upload preview cover</div>
          {/* <div className="post-submit-cover__change">Change cover</div>
          <input type="file" /> */}
        </label>
      </div>
    </div>

    <div className="post-submit-form__field">
      <TextareaAutosize
        rows="1"
        placeholder="Preview title"
        className="post-submit-form__data post-submit-form__data_title"
      />
    </div>

    <div className="post-submit-form__field">
      <TextareaAutosize
        rows="1"
        placeholder="Preview sub title"
        className="post-submit-form__data post-submit-form__data_lead"
      />
    </div>
  </div>
);
