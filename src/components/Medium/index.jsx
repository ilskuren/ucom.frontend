import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { addErrorNotification } from '../../actions/notifications';
import TributeWrapper from '../TributeWrapper';
import './styles.css';

class Medium extends PureComponent {
  componentDidMount() {
    const MediumEditor = require('medium-editor'); // eslint-disable-line
    const MediumUpload = require('./Upload/index'); // eslint-disable-line
    const MediumPost = require('./Post/index'); // eslint-disable-line
    const MediumSurvey = require('./Survey/index'); // eslint-disable-line
    const MediumEmbed = require('./Embed/index'); // eslint-disable-line

    this.mediumEditor = new MediumEditor(this.el, {
      toolbar: {
        buttons: ['h1', 'h2', 'bold', 'italic', 'underline', 'strikethrough', 'anchor', 'quote', 'orderedlist', 'unorderedlist'],
      },
      placeholder: false,
      imageDragging: false,
      extensions: {
        mediumEmbed: new MediumEmbed.default(), // eslint-disable-line
        mediumSurvey: new MediumSurvey.default(), // eslint-disable-line
        mediumPost: new MediumPost.default(), // eslint-disable-line
        mediumUpload: new MediumUpload.default({ // eslint-disable-line
          onError: (message) => {
            this.props.addErrorNotification(message);
          },
          onUploadStart: () => {
            if (this.props.onUploadStart) {
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
