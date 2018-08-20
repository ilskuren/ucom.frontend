import React from 'react';
import CircleButton from './CircleButton';

const TextEditor = () => (
  <div className="text-editor">
    <div className="text-editor__hashtag">
      <a href="#"># STORY</a>
    </div>
    <div className="text-editor__content">
      <div className="text-editor__add-button">
        <CircleButton />
      </div>
      <div className="text-editor__main-text">
        <div className="text-editor__title">Title</div>
        <div className="text-editor__lead-text">Lead text</div>
        <div className="text-editor__text">Text</div>
      </div>
    </div>
  </div>
);

export default TextEditor;
