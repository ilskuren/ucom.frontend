import MediumEditor from 'medium-editor';

export const UploadExtension = MediumEditor.Extension.extend({
  name: 'upload',

  init() {
    this.base.subscribe('editableKeydownEnter', (e, editable) => {
      console.log(editable);
    });
  },
});
