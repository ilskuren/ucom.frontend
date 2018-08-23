import PropTypes from 'prop-types';
import MediumEditor from 'medium-editor';
import React, { PureComponent } from 'react';

class TextEditor extends PureComponent {
  componentDidMount() {
    this.mediumEditor = new MediumEditor(this.textEditor, {
      toolbar: {
        buttons: ['bold', 'italic', 'underline', 'anchor', 'h2'],
      },
    });

    this.mediumEditor.subscribe('editableInput', (event, editable) => {
      if (typeof this.props.onChangeContent === 'function') {
        const html = editable.innerHTML;

        this.props.onChangeContent(html);
      }
    });
  }

  componentWillUnmount() {
    this.mediumEditor.destroy();
  }

  render() {
    return (
      <div className="text-editor" >
        <div className="text-editor__inner">
          <div className="text-editor__title">
            <input
              type="text"
              placeholder="Title"
              className="text-editor__title-input"
              onChange={(e) => {
                if (typeof this.props.onChangeTitle === 'function') {
                  this.props.onChangeTitle(e.target.value);
                }
              }}
            />
          </div>
          <div className="text-editor__content" ref={(el) => { this.textEditor = el; }} />
        </div>
      </div>
    );
  }
}

TextEditor.propTypes = {
  onChangeTitle: PropTypes.func,
  onChangeContent: PropTypes.func,
};

export default TextEditor;
