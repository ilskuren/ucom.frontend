import PropTypes from 'prop-types';
import MediumEditor from 'medium-editor';
import React, { PureComponent } from 'react';
import config from '../../package.json';

const $ = require('jquery');

require('medium-editor-insert-plugin')($);

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
    });

    if (this.props.value) {
      this.mediumEditor.setContent(this.props.value);
    }

    if (typeof this.props.onChange === 'function') {
      this.mediumEditor.subscribe('editableKeyup', () => {
        this.props.onChange(this.getValue());
      });
    }

    $(this.el).mediumInsert({
      editor: this.mediumEditor,
      addons: {
        images: {
          captions: false,
          fileUploadOptions: {
            url: `${config.backend.httpEndpoint}/api/v1/posts/image`,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            singleFileUploads: true,
            paramName: 'image',
          },
        },
      },
    });
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

export default Medium;
