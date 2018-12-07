import PropTypes from 'prop-types';
import MediumEditor from 'medium-editor';
import React, { PureComponent } from 'react';
import { getBackendConfig } from '../utils/config';

const $ = require('jquery');

require('medium-editor-insert-plugin')($);

const UosExtension = MediumEditor.Extension.extend({
  name: 'uos',

  init() {
    let el;
    const trigger = document.createElement('div');

    trigger.className = 'medium-trigger';
    trigger.innerHTML = '+';

    document.body.appendChild(trigger);

    trigger.addEventListener('click', () => {
      if (!el) {
        this.base.origElements.innerHTML = '<p>123</p>';
        console.log(this.base.origElements);
      } else {
        el.innerHTML = '123';
      }
    });

    this.base.subscribe('editableKeyup', (e) => {
      console.log(this.base.getSelectedParentElement());

      if (e.which === 13) {
        el = this.base.getSelectedParentElement();
        const rect = this.base.getSelectedParentElement().getBoundingClientRect();

        trigger.style.top = `${rect.y}px`;
        trigger.style.left = `${rect.x}px`;
      }
    });
  },

  handleKeydown() {
    console.log('qwe');
  },
});

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
        uos: new UosExtension(),
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

export default Medium;
