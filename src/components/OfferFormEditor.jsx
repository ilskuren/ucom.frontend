import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Medium from '../components/Medium';
import { setPostData, validatePostField } from '../actions';

class OfferFormEditor extends PureComponent {
  render() {
    return (
      <div className="editor">
        <div className="editor__item">
          <input
            type="text"
            placeholder="Lead text"
            className="editor__input editor__input_medium"
            value={this.props.post.data.leading_text}
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

OfferFormEditor.propTypes = {
  post: PropTypes.objectOf(PropTypes.any),
  setPostData: PropTypes.func,
  validatePostField: PropTypes.func,
};

export default connect(
  state => ({
    post: state.post,
  }),
  dispatch => ({
    setPostData: data => dispatch(setPostData(data)),
    validatePostField: data => dispatch(validatePostField(data)),
  }),
)(OfferFormEditor);
