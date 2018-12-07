import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import MediumEditor from 'medium-editor';
import React, { PureComponent } from 'react';
import { MediumUpload } from '../utils/medium';
import { addErrorNotification } from '../actions/notifications';

// const $ = require('jquery');

// require('medium-editor-insert-plugin')($);

class Medium extends PureComponent {
  componentDidMount() {
    this.mediumEditor = new MediumEditor(this.el, {
      toolbar: {
        buttons: [
          'h2',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'anchor',
          'quote',
          'orderedlist',
          'unorderedlist',
        ],
      },
      placeholder: {
        text: 'Text',
      },
      extensions: {
        uos: new MediumUpload({
          onUploadError: (message) => {
            this.props.addErrorNotification(message);
          },
        }),
      },
    });

    if (this.props.value) {
      this.mediumEditor.setContent(this.props.value);
    }

    if (typeof this.props.onChange === 'function') {
      this.mediumEditor.subscribe('editableInput', () => {
        this.props.onChange(this.getValue());
      });
    }

    // $(this.el).mediumInsert({
    //   editor: this.mediumEditor,
    //   addons: {
    //     images: {
    //       captions: false,
    //       fileUploadOptions: {
    //         url: `${getBackendConfig().httpEndpoint}/api/v1/posts/image`,
    //         acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
    //         singleFileUploads: true,
    //         paramName: 'image',
    //       },
    //     },
    //     embeds: {
    //       oembedProxy: 'https://iframely.u.community/iframely?',
    //     },
    //   },
    // });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.getValue()) {
      this.mediumEditor.setContent(nextProps.value || '<p><br /></p>');
    }
  }

  componentWillUnmount() {
    this.mediumEditor.destroy();
  }

  getValue() {
    return this.mediumEditor.serialize()['element-0'].value;
  }

  render() {
    return (
      <div ref={(el) => { this.el = el; }} />
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
