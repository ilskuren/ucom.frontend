import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Medium from './Medium';
import { setDataToStoreToLS, validatePostField } from '../actions';
import { escapeQuotes, getTextContent } from '../utils/text';
import { selectUser } from '../store/selectors';
import TextareaAutosize from './TextareaAutosize';
import PostFormEditorCover from './PostFormEditorCover';

class PostFormEditor extends PureComponent {
  render() {
    return (
      <div className="editor">
        <div className="editor__item">
          <TextareaAutosize
            rows="1"
            maxLength="1000"
            placeholder="Title"
            className="editor__input"
            value={escapeQuotes(this.props.post.data.title) || ''}
            onChange={(e) => {
              this.props.setDataToStoreToLS({ title: getTextContent(e.target.value) });
              this.props.validatePostField('title');
            }}
          />

          {this.props.post.errors.title && this.props.post.errors.title.length > 0 ? (
            <div className="editor__error">{this.props.post.errors.title[0]}</div>
          ) : null}
        </div>

        <div className="editor__item">
          <PostFormEditorCover
            file={this.props.post.data.main_image_filename}
            onClickRemove={() => {
              this.props.setPostData({ main_image_filename: '' });
              this.props.validatePostField('main_image_filename');
            }}
            onChangeFile={(file) => {
              this.props.setPostData({ main_image_filename: file });
              this.props.validatePostField('main_image_filename');
            }}
          />

          {this.props.post.errors.main_image_filename && this.props.post.errors.main_image_filename.length > 0 ? (
            <div className="editor__error">{this.props.post.errors.main_image_filename}</div>
          ) : null}
        </div>

        <div className="editor__item">
          <TextareaAutosize
            rows="1"
            maxLength="1000"
            placeholder="Lead text"
            className="editor__input editor__input_medium"
            value={escapeQuotes(this.props.post.data.leading_text) || ''}
            onChange={(e) => {
              this.props.setDataToStoreToLS({ leading_text: e.target.value });
              this.props.validatePostField('leading_text');
            }}
          />

          {this.props.post.errors.leading_text && this.props.post.errors.leading_text.length > 0 ? (
            <div className="editor__error">{this.props.post.errors.leading_text[0]}</div>
          ) : null}
        </div>

        <div className="editor__item">
          <div className="editor__body">
            <Medium
              value={this.props.post.data.description}
              onChange={(description) => {
                this.props.setDataToStoreToLS({ description });
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
    setDataToStoreToLS: data => dispatch(setDataToStoreToLS(data)),
    validatePostField: data => dispatch(validatePostField(data)),
  }),
)(PostFormEditor);
