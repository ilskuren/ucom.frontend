import MediumEditor from 'medium-editor';

export default class ImageFromLink extends MediumEditor.Extension {
  name = 'ImageFromLink';

  init() {
    this.base.subscribe('editableKeyup', () => {
      this.getEditorElements().forEach((el) => {
        const imagesLinksEls = el.querySelectorAll('[href$="jpeg"], [href$="jpg"], [href$="png"]');
        imagesLinksEls.forEach(linkEl => this.converLinkToImage(linkEl));
      });
    });
  }

  converLinkToImage(linkEl) {
    const parentEl = linkEl.parentNode;
    const childNodes = Array.from(parentEl.childNodes)
      .filter(node => node !== linkEl)
      .filter(node => node.tagName !== 'BR');
    const imgEl = document.createElement('img');
    imgEl.src = linkEl.href;

    if (childNodes.length) {
      parentEl.replaceChild(imgEl, linkEl);
    } else {
      parentEl.innerHTML = imgEl.outerHTML;
    }
  }
}
