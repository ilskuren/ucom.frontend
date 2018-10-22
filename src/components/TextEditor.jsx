import PropTypes from 'prop-types';
import MediumEditor from 'medium-editor';
import React, { PureComponent } from 'react';
import DropZone from './DropZone';
import IconClose from './Icons/Close';
import { getFileUrl } from '../utils/upload';
import { getError } from '../utils/errors';
import { getBackendConfig } from '../utils/config';

const $ = require('jquery');

require('medium-editor-insert-plugin')($);

class TextEditor extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      cover: this.props.cover ? getFileUrl(this.props.cover) : null,
    };
  }

  componentDidMount() {
    this.mediumEditor = new MediumEditor(this.textEditor, {
      toolbar: {
        buttons: ['bold', 'italic', 'underline', 'strikethrough', 'anchor', 'h2', 'quote', 'orderedlist', 'unorderedlist'],
      },
    });

    this.mediumEditor.setContent(this.props.description);

    this.mediumEditor.subscribe('editableInput', () => {
      if (typeof this.props.onChangeDescription === 'function') {
        const content = this.mediumEditor.serialize()['element-0'].value;

        this.props.onChangeDescription(content);
      }
    });

    $(this.textEditor).mediumInsert({
      editor: this.mediumEditor,
      addons: {
        images: {
          captions: false,
          fileUploadOptions: {
            url: `${getBackendConfig().httpEndpoint}/api/v1/posts/image`,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            paramName: 'image',
            singleFileUploads: true,
          },
        },
      },
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
    const titleError = getError(this.props.errors, 'title');
    const leadingTextError = getError(this.props.errors, 'leading_text');
    const descriptionError = getError(this.props.errors, 'description');

    return (
      <div className="text-editor" >
        <div className="text-editor__inner">
          <div className="text-editor__field">
            <input
              type="text"
              placeholder="Title"
              className="text-editor__title"
              value={this.props.title}
              onChange={(e) => {
                if (typeof this.props.onChangeTitle === 'function') {
                  this.props.onChangeTitle(e.target.value);
                }
              }}
            />
            {titleError && (
              <div className="text-editor__error">{titleError}</div>
            )}
          </div>

          <div className="text-editor__field text-editor__field_small">
            <input
              type="text"
              placeholder="Lead text"
              className="text-editor__title text-editor__title_lead"
              value={this.props.leadingText}
              onChange={(e) => {
                if (typeof this.props.onChangeLeadingText === 'function') {
                  this.props.onChangeLeadingText(e.target.value);
                }
              }}
            />

            {leadingTextError && (
              <div className="text-editor__error">{leadingTextError}</div>
            )}
          </div>

          <div className="text-editor__field text-editor__field_small">
            {!this.state.cover ? (
              <DropZone
                text="Add cover image"
                accept="image/jpeg, image/png"
                className="drop-zone_line"
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

          <div
            className="text-editor__content"
            ref={(el) => { this.textEditor = el; }}
          />
          {descriptionError && (
            <div className="text-editor__error">{descriptionError}</div>
          )}
        </div>
      </div>
    );
  }
}

TextEditor.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  leadingText: PropTypes.string,
  cover: PropTypes.string,
  onChangeTitle: PropTypes.func,
  onChangeDescription: PropTypes.func,
  onChangeLeadingText: PropTypes.func,
  onChangeCover: PropTypes.func,
  errors: PropTypes.arrayOf(PropTypes.object),
};

TextEditor.defaultProps = {
  errors: [],
};

export default TextEditor;
