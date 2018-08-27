import { KEY_RETURN } from 'keycode-js';
import MediumEditor from 'medium-editor';

const buttonsTemplate = `
  <div class="editor-buttons">
    buttons
  </div>
`;

export const UploadExtension = MediumEditor.Extension.extend({
  name: 'upload',

  init() {
    this.buttons = document.createElement('div');
    this.buttons.innerHTML = buttonsTemplate;

    this.base.subscribe('editableKeyup', (e) => {
      const { anchorNode } = window.getSelection();

      if (e.keyCode === KEY_RETURN && anchorNode.textContent === '') {
        this.showButtons(anchorNode);
      } else {
        this.hideButtos();
      }
    });
  },

  showButtons(el) {
    el.appendChild(this.buttons);
  },

  hideButtos() {

  },
});
