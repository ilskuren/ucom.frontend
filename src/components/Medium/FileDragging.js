import { uniqueId } from 'lodash';
import MediumEditor from 'medium-editor';
import api from '../../api';
import { UPLOAD_SIZE_LIMIT, UPLOAD_SIZE_LIMIT_ERROR, UPLAOD_ERROR_BASE, getBase64FromFile } from '../../utils/upload';
import loader from '../../utils/loader';

export default MediumEditor.extensions.fileDragging.extend({
  async insertImageFile(file) {
    if (file.size > UPLOAD_SIZE_LIMIT) {
      if (this.onError) {
        this.onError(UPLOAD_SIZE_LIMIT_ERROR);
      }
      return;
    }

    const img = this.document.createElement('img');
    const imgId = uniqueId('upload-img');
    img.id = imgId;

    try {
      const base64 = await getBase64FromFile(file);
      img.src = base64;
      MediumEditor.util.insertHTMLCommand(this.document, img.outerHTML);
    } catch (e) {
      console.error(e);
      return;
    }

    loader.start();

    try {
      const data = await api.uploadPostImage(file);
      const imgUrl = data.files[0].url;
      const imgEl = this.document.getElementById(imgId);
      if (imgEl) {
        imgEl.src = imgUrl;
        imgEl.removeAttribute('id');
      }
    } catch (e) {
      console.error(e);
      if (this.onError) {
        this.onError(UPLAOD_ERROR_BASE);
      }
    }

    loader.done();
  },
});

