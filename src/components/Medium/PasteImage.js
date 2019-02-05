import MediumEditor from 'medium-editor';
// import { getBase64FromFile } from '../../utils/upload';

export default class PasteImage extends MediumEditor.Extension {
  name = 'PasteImage';

  init() {
    this.subscribe('editableKeydown', (e) => {
      if (!(MediumEditor.util.isKey(e, MediumEditor.util.keyCode.V) && MediumEditor.util.isMetaCtrlKey(e))) {
        return;
      }

      console.log(e);
      if (e.clipboardData && e.clipboardData.files) {
        e.preventDefault();
      }
    });
  }
}

// export default MediumEditor.extensions.paste.extend({
//   // createPasteBin(editable) {
//   //   MediumEditor.extensions.paste.prototype.createPasteBin.call(this, editable);

//   //   keyboardPasteEditable = editable;
//   // },

//   handlePasteBinPaste(event) {
//     let imgPaste = false;

//     if (event.clipboardData && event.clipboardData.files) {
//       Array.prototype.slice.call(event.clipboardData.files)
//         .filter(f => f.type.indexOf('image/') === 0)
//         .forEach(async (file) => {
//           imgPaste = true;

//           const img = this.document.createElement('img');
//           const base64 = await getBase64FromFile(file);
//           img.src = base64;
//           this.pasteHTML(img.outerHTML);
//           this.doPaste(img.outerHTML, false);
//           // MediumEditor.util.insertHTMLCommand(this.document, img.outerHTML);
//         });
//     }

//     if (!imgPaste) {
//       MediumEditor.extensions.paste.prototype.handlePasteBinPaste.call(this, event);
//     }
//   },
// });
