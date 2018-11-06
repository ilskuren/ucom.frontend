import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DropZone from './DropZone';
import IconClose from './Icons/Close';
import Medium from './Medium';
import { setPostData, validatePostField } from '../actions';
import { getFileUrl, getBase64FromFile } from '../utils/upload';
import { escapeQuotes, getTextContent } from '../utils/text';
import { selectUser } from '../store/selectors';

class PostFormEditor extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      base64Cover: null,
    };
  }

  render() {
    return (
      <div className="editor">
        <div className="editor__item">
          <input
            type="text"
            placeholder="Title"
            className="editor__input"
            value={escapeQuotes(this.props.post.data.title) || ''}
            onChange={(e) => {
              this.props.setPostData({ title: getTextContent(e.target.value) });
              this.props.validatePostField('title');
            }}
          />

          {this.props.post.errors.title && this.props.post.errors.title.length > 0 ? (
            <div className="editor__error">{this.props.post.errors.title[0]}</div>
          ) : null}
        </div>

        <div className="editor__item">
          <input
            type="text"
            placeholder="Lead text"
            className="editor__input editor__input_medium"
            value={escapeQuotes(this.props.post.data.leading_text) || ''}
            onChange={(e) => {
              this.props.setPostData({ leading_text: e.target.value });
              this.props.validatePostField('leading_text');
            }}
          />

          {this.props.post.errors.leading_text && this.props.post.errors.leading_text.length > 0 ? (
            <div className="editor__error">{this.props.post.errors.leading_text[0]}</div>
          ) : null}
        </div>

        <div className="editor__item">
          {(this.state.base64Cover || this.props.post.data.main_image_filename) ? (
            <div className="cover">
              <div className="cover__inner">
                <div className="cover__remove">
                  <button
                    className="button-clean button-clean_close"
                    onClick={() => {
                      this.setState({ base64Cover: '' });
                      this.props.setPostData({ main_image_filename: '' });
                      this.props.validatePostField('main_image_filename');
                    }}
                  >
                    <IconClose />
                  </button>
                </div>

                <img className="cover__img" src={this.state.base64Cover || getFileUrl(this.props.post.data.main_image_filename)} alt="" />
              </div>
            </div>
          ) : (
            <DropZone
              className="drop-zone_line"
              text="Add cover image"
              accept="image/jpeg, image/png"
              onDrop={(files) => {
                getBase64FromFile(files[0]).then((base64Cover) => {
                  this.props.setPostData({ main_image_filename: files[0] });
                  this.props.validatePostField('main_image_filename');
                  this.setState({ base64Cover });
                });
              }}
            />
          )}

          {this.props.post.errors.main_image_filename && this.props.post.errors.main_image_filename.length > 0 ? (
            <div className="editor__error">{this.props.post.errors.main_image_filename}</div>
          ) : null}
        </div>

        <div className="editor__item">
          <div className="editor__body">
            <Medium
              value={this.props.post.data.description}
              onChange={(description) => {
                this.props.setPostData({ description });
                this.props.validatePostField('description');
              }}
            />
          </div>

          {this.props.post.errors.description && this.props.post.errors.description.length > 0 ? (
            <div className="editor__error">{this.props.post.errors.description[0]}</div>
          ) : null}
        </div>
      </div>
    );
  }
}

PostFormEditor.propTypes = {
  post: PropTypes.objectOf(PropTypes.any),
  setPostData: PropTypes.func,
  validatePostField: PropTypes.func,
};

export default connect(
  state => ({
    user: selectUser(state),
    post: state.post,
  }),
  dispatch => ({
    setPostData: data => dispatch(setPostData(data)),
    validatePostField: data => dispatch(validatePostField(data)),
  }),
)(PostFormEditor);
