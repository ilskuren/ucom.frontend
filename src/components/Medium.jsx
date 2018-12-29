import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { addErrorNotification } from '../actions/notifications';
import TributeWrapper from './TributeWrapper';

class Medium extends PureComponent {
  componentDidMount() {
    const MediumEditor = require('medium-editor'); // eslint-disable-line
    const MediumUpload = require('../utils/medium/mediumUpload'); // eslint-disable-line
    const MediumPost = require('../utils/medium/mediumPost'); // eslint-disable-line

    this.mediumEditor = new MediumEditor(this.el, {
      toolbar: {
        buttons: ['h1', 'h2', 'bold', 'italic', 'underline', 'strikethrough', 'anchor', 'quote', 'orderedlist', 'unorderedlist'],
      },
      placeholder: false,
      imageDragging: false,
      extensions: {
        mediumPost: new MediumPost.default(), // eslint-disable-line
        mediumUpload: new MediumUpload.default({ // eslint-disable-line
          onUploadError: (message) => {
            this.props.addErrorNotification(message);
          },
          onUploadStart: () => {
            if (typeof this.props.onUploadStart === 'function') {
              this.props.onUploadStart();
            }
          },
          onUploadDone: () => {
            if (typeof this.props.onUploadDone === 'function') {
              this.props.onUploadDone();
            }
          },
        }),
      },
    });

    if (this.props.value) {
      this.mediumEditor.setContent(this.props.value);
    }

    if (typeof this.props.onChange === 'function') {
      this.mediumEditor.subscribe('editableInput', () => {
        this.props.onChange(this.mediumEditor.getContent());
      });
    }
  }

  componentDidUpdate() {
    if (this.props.value && this.props.value !== this.mediumEditor.getContent()) {
      this.mediumEditor.setContent(this.props.value);
    }
  }

  componentWillUnmount() {
    this.mediumEditor.destroy();
  }

  render() {
    return (
      <TributeWrapper
        onChange={e => this.props.onChange(e)}
      >
        <div className="post-content" ref={(el) => { this.el = el; }} />
      </TributeWrapper>
    );
  }
}

Medium.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default connect(
  null,
  dispatch => bindActionCreators({
    addErrorNotification,
  }, dispatch),
)(Medium);
