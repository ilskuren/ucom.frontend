import PropTypes from 'prop-types';
import MediumEditor from 'medium-editor';
import React, { PureComponent } from 'react';
import config from '../../package.json';

const $ = require('jquery');

require('medium-editor-insert-plugin')($);

class Medium extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }

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

    if (this.state.value) {
      this.mediumEditor.setContent(this.state.value);
    }

    if (typeof this.props.onChange === 'function') {
      this.mediumEditor.subscribe('editableInput', () => {
        const { value } = this.mediumEditor.serialize()['element-0'];

        this.props.onChange(value);
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

  componentWillUnmount() {
    this.mediumEditor.destroy();
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
