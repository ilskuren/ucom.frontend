import { KEY_DOWN, KEY_UP, KEY_RIGHT, KEY_LEFT, KEY_BACK_SPACE, KEY_DELETE } from 'keycode-js';
import MediumEditor from 'medium-editor';

export default class MediumEmbed extends MediumEditor.Extension {
  name = 'MediumEmbed';

  init() {
    let state = {};

    this.base.subscribe('editableClick', () => {
      state = { ...state, ...this.getState() };
    });

    this.base.subscribe('editableKeyup', () => {
      state = { ...state, ...this.getState() };
    });

    this.base.subscribe('editableKeydown', (e) => {
      if (e.which === KEY_DOWN && state.cursonInLastLine && state.nextElementIsEmbed) {
        console.log('bingo down');
      }

      if (e.which === KEY_UP && state.cursonInFirstLine && state.prevElementIsEmbed) {
        console.log('bingo up');
      }

      if ((e.which === KEY_RIGHT || e.which === KEY_DELETE) && state.cursonInLastLine && state.cursonInLastCharacter && state.nextElementIsEmbed) {
        console.log('bingo right');
        e.preventDefault();
      }

      if ((e.which === KEY_LEFT || e.which === KEY_BACK_SPACE) && state.cursonInFirstLine && state.cursonInFirstCharacter && state.prevElementIsEmbed) {
        console.log('bingo left');
        e.preventDefault();
      }
    });
  }

  getCursorLine() {
    const selection = window.getSelection();

    if (!selection || selection.anchorOffset !== selection.focusOffset) {
      return null;
    }

    const range = selection.getRangeAt(0);

    selection.modify('move', 'backward', 'lineboundary');
    selection.modify('extend', 'forward', 'lineboundary');

    const line = selection.getRangeAt(0).toString();

    selection.removeAllRanges();
    selection.addRange(range);

    return line;
  }

  getState() {
    const state = {
      cursonInLastLine: false,
      cursonInFirstLine: false,
      cursonInLastCharacter: false,
      cursonInFirstCharacter: false,
      nextElementIsEmbed: false,
      prevElementIsEmbed: false,
    };


    const line = this.getCursorLine();
    const currentBlock = this.getCurrentBlock();

    if (!line || !currentBlock) {
      return state;
    }

    const caretCharacterOffsetWithin = this.getCaretCharacterOffsetWithin(currentBlock);
    const content = currentBlock.textContent;
    const lineIndex = content.indexOf(line);
    let rest = content.slice(0, lineIndex);
    rest = content.replace(rest, '');
    rest = rest.replace(line, '');

    state.cursonInLastLine = rest.length === 0;
    state.cursonInFirstLine = content.indexOf(line) === 0;

    const nextBlock = currentBlock.nextSibling;
    const prevBlock = currentBlock.previousSibling;

    state.nextElementIsEmbed = nextBlock ? nextBlock.hasAttribute('data-embed') : false;
    state.prevElementIsEmbed = prevBlock ? prevBlock.hasAttribute('data-embed') : false;
    state.cursonInLastCharacter = content.length === caretCharacterOffsetWithin;
    state.cursonInFirstCharacter = caretCharacterOffsetWithin === 0;

    return state;
  }

  getCurrentBlock() {
    const selection = window.getSelection();

    if (!selection || selection.anchorOffset !== selection.focusOffset) {
      return null;
    }

    const findCurrentBlock = (el) => {
      if (el.parentElement.hasAttribute('data-medium-editor-element')) {
        return el;
      }

      return findCurrentBlock(el.parentElement);
    };

    return findCurrentBlock(this.base.getSelectedParentElement());
  }

  getCaretCharacterOffsetWithin(element) {
    const sel = window.getSelection();
    let caretOffset = 0;

    if (sel.rangeCount > 0) {
      const range = window.getSelection().getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    }

    return caretOffset;
  }
}
