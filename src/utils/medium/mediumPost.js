import MediumEditor from 'medium-editor';

export const parseContent = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  const childNodes = Array.from(div.childNodes);
  const img = div.querySelector('img');

  let title = null;
  let leadingText = null;
  let entityImages = null;

  for (let i = 0; i < childNodes.length; i++) {
    if (childNodes[i].textContent) {
      title = childNodes[i].textContent;
      childNodes.splice(i, 1);
      break;
    }
  }

  for (let i = 0; i < childNodes.length; i++) {
    if (childNodes[i].textContent) {
      leadingText = childNodes[i].textContent;
      break;
    }
  }

  if (!leadingText) {
    leadingText = title;
  }

  if (img) {
    entityImages = {
      articleTitle: [{
        url: img.src,
      }],
    };
  }

  return ({
    title, leadingText, entityImages, description: html,
  });
};

class Input {
  constructor(tagName) {
    this.el = document.createElement(tagName);
    this.el.innerHTML = '<br>';
  }

  showPlaceholder() {
    this.el.classList.add('medium-post-placeholder');
  }

  hidePlaceholder() {
    this.el.classList.remove('medium-post-placeholder');
  }

  togglePlaceholder(show) {
    if (show) {
      this.showPlaceholder();
    } else {
      this.hidePlaceholder();
    }
  }
}

export default class MediumPost extends MediumEditor.Extension {
  name = 'MediumPost';

  init() {
    const title = new Input('h1');
    const leadText = new Input('h2');
    const mainText = new Input('p');

    title.showPlaceholder();
    leadText.showPlaceholder();
    mainText.showPlaceholder();

    this.base.origElements.appendChild(title.el);
    this.base.origElements.appendChild(leadText.el);
    this.base.origElements.appendChild(mainText.el);

    this.base.subscribe('editableKeypress', (e) => {
      const el = this.base.getSelectedParentElement();

      if (e.which === 13 && (el === title.el || el === leadText.el) && el.nextSibling) {
        e.preventDefault();
        this.setCursorToElemnt(el.nextSibling);
      }
    });

    this.base.subscribe('editableInput', (e) => {
      if (!(e instanceof InputEvent)) {
        return;
      }

      const el = this.base.getSelectedParentElement();
      const hasContent = el.textContent.length > 0;

      if (el === title.el) {
        title.togglePlaceholder(!hasContent);
      } else if (el === leadText.el) {
        leadText.togglePlaceholder(!hasContent);
      } else if (el === mainText.el) {
        mainText.togglePlaceholder(!hasContent);
      } else {
        el.classList.remove('medium-post-placeholder');
      }
    });
  }

  setCursorToElemnt(el) {
    const range = document.createRange();
    const sel = window.getSelection();

    range.setStart(el, 0);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }
}
