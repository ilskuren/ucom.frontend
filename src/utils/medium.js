import MediumEditor from 'medium-editor';
import api from '../api';
import loader from './loader';
import { UPLOAD_SIZE_LIMIT, UPLOAD_SIZE_LIMIT_ERROR, getBase64FromFile } from '../utils/upload';

class UploadButtons {
  constructor({ onImageSelect }) {
    this.onImageSelect = onImageSelect;
    this.el = document.createElement('div');
    this.el.className = 'medium-upload';

    this.render();

    this.el.querySelector('.js-trigger').addEventListener('click', () => {
      this.toggleButtons();
    });

    this.el.querySelector('.js-file-input').addEventListener('change', (e) => {
      this.onImageSelect(e.target.files[0]);
      this.hide();
    });

    document.body.appendChild(this.el);
  }

  render() {
    this.el.innerHTML = `
      <div class="medium-upload__trigger">
        <div class="medium-upload__button js-trigger">
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.2832 0.187977H8.28919V8.01398H0.383739V9.98798H8.28919V17.814H10.2832L10.2832 9.98798L18.1887 9.98798V8.01398L10.2832 8.01398L10.2832 0.187977Z" />
          </svg>
        </div>
      </div>

      <div class="medium-upload__list">
        <div class="medium-upload__item">
          <label class="medium-upload__button">
            <input type="file" class="js-file-input" />
            <svg width="18" height="18" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z" />
            </svg>
          </label>
        </div>
        <div class="medium-upload__item">
          <div class="medium-upload__button">
            <svg width="21" height="21" viewBox="0 0 576 512" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
            </svg>
          </div>
        </div>
      </div>
    `;
  }

  toggleButtons() {
    this.el.classList.toggle('medium-upload_active');
  }

  hideButtons() {
    this.el.classList.remove('medium-upload_active');
  }

  show(el) {
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const left = rect.left + window.scrollX;

    this.el.style.top = `${top}px`;
    this.el.style.left = `${left}px`;
    this.el.classList.add('medium-upload_visible');
  }

  hide() {
    this.hideButtons();
    this.el.classList.remove('medium-upload_visible');
  }

  remove() {
    this.el.parentNode.removeChild(this.el);
  }
}

export class MediumUpload extends MediumEditor.Extension {
  name = 'MediumUpload';
  currentEl = null;

  constructor(params) {
    super(params);

    this.onUploadError = params.onUploadError;
    this.uploadButtons = new UploadButtons({
      onImageSelect: this.uplaodImage,
    });
  }

  init() {
    this.base.subscribe('editableKeyup', () => {
      this.currentEl = this.base.getSelectedParentElement();

      if (this.hasShowUploadButtons()) {
        this.uploadButtons.show(this.currentEl);
      } else {
        this.uploadButtons.hide();
      }
    });
  }

  destroy() {
    this.uploadButtons.remove();
  }

  hasShowUploadButtons() {
    const div = document.createElement('div');
    div.appendChild(this.currentEl.cloneNode(true));

    return div.innerHTML === '<p><br></p>';
  }

  setCursorToElemnt(el) {
    const range = document.createRange();
    const sel = window.getSelection();

    range.setStart(el.childNodes[0], 0);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  appendImage = (imageUrl) => {
    const parentEl = this.currentEl.parentNode;
    const newLine = document.createElement('p');

    newLine.innerHTML = '<br>';
    this.currentEl.innerHTML = `<img src=${imageUrl} />`;
    parentEl.insertBefore(newLine, this.currentEl.nextSibling);
    this.setCursorToElemnt(newLine);
    this.currentEl = newLine;
  }

  uplaodImage = async (file) => {
    if (!file.type.indexOf('image/') === 0) {
      return;
    }

    if (file.size > UPLOAD_SIZE_LIMIT && typeof this.onUploadError === 'function') {
      this.onUploadError(UPLOAD_SIZE_LIMIT_ERROR);
      return;
    }

    // const img = document.createElement('img');

    loader.start();

    getBase64FromFile(file).then((base64) => {
      this.appendImage(base64);
    });

    // try {
    //   const data = await api.uploadPostImage(file);
    //   this.appendImage(data.files[0].url);
    // } catch (e) {
    //   console.error(e);
    // }

    loader.done();
  }
}
