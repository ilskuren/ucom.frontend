import React, { PureComponent } from 'react';
import Letters from '@ckeditor/letters/build/letters';

export default class TextEditor extends PureComponent {
  componentDidMount() {
    Letters.create(document.querySelector('.text-editor'), {
      cloudServices: {
        tokenUrl: 'https://34467.cke-cs.com/token/dev/i0uxEkiJEzU59EEF2bsPwv5fCR0g9YrsVuiesXE7CXGULQM6VRpFaQS2kPD4',
        uploadUrl: 'https://34467.cke-cs.com/easyimage/upload/',
        webSocketUrl: '34467.cke-cs.com/ws',
        documentId: 'text-editor',
      },
      title: 'Title',
      body: '<h2>Lead text</h2> <h3>Text</h3>',
    });
  }

  render() {
    return (
      <div className="text-editor" />
    );
  }
}
