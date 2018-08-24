import PropTypes from 'prop-types';
import MediumEditor from 'medium-editor';
import React, { PureComponent } from 'react';
import { UploadExtension } from '../utils/editor';
import DropZone from './DropZone';
import IconClose from './Icons/Close';

class TextEditor extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      cover: null,
    };
  }

  componentDidMount() {
    this.mediumEditor = new MediumEditor(this.textEditor, {
      toolbar: {
        buttons: ['bold', 'italic', 'underline', 'anchor', 'h2'],
      },
      extensions: {
        upload: new UploadExtension(),
      },
    });

    this.mediumEditor.subscribe('editableInput', (event, editable) => {
      if (typeof this.props.onChangeDescription === 'function') {
        const html = editable.innerHTML;

        this.props.onChangeDescription(html);
      }
    });
  }

  componentWillUnmount() {
    this.mediumEditor.destroy();
  }

  onChangeCover(file) {
    if (typeof this.props.onChangeCover === 'function') {
      this.props.onChangeCover(file);
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        cover: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  removeCover() {
    this.setState({
      cover: null,
    });
  }

  render() {
    return (
      <div className="text-editor" >
        <div className="text-editor__inner">
          <div className="text-editor__field">
            <input
              type="text"
              placeholder="Title"
              className="text-editor__title"
              onChange={(e) => {
                if (typeof this.props.onChangeTitle === 'function') {
                  this.props.onChangeTitle(e.target.value);
                }
              }}
            />
          </div>

          <div className="text-editor__field">
            <input
              type="text"
              placeholder="Lead text"
              className="text-editor__title text-editor__title_lead"
              onChange={(e) => {
                if (typeof this.props.onChangeLeadingText === 'function') {
                  this.props.onChangeLeadingText(e.target.value);
                }
              }}
            />
          </div>

          <div className="text-editor__field">
            {!this.state.cover ? (
              <DropZone
                text="Add cover image"
                accept="image/jpeg, image/png"
                onDrop={files => this.onChangeCover(files[0])}
              />
            ) : (
              <div className="text-editor__cover">
                <div className="cover">
                  <div className="cover__inner">
                    <div className="cover__remove">
                      <button
                        className="button-clean button-clean_close"
                        onClick={() => this.removeCover()}
                      >
                        <IconClose />
                      </button>
                    </div>

                    <img className="cover__img" src={this.state.cover} alt="" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-editor__content" ref={(el) => { this.textEditor = el; }} />
        </div>
      </div>
    );
  }
}

TextEditor.propTypes = {
  onChangeTitle: PropTypes.func,
  onChangeDescription: PropTypes.func,
  onChangeLeadingText: PropTypes.func,
  onChangeCover: PropTypes.func,
};

export default TextEditor;
