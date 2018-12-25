import { memoize } from 'lodash';
import sanitizeHtml from 'sanitize-html';

const URL_REGEX = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

export const escapeQuotes = memoize((text = '') => text.replace(/&quot;/g, '"'));
const makeLinkTag = (match) => {
  const link = match.replace('#', '').trim();
  return `<a href='/tags/${link}'class='tag_link'>${match}</a>`;
};
export const checkHashTag = memoize((text = '') => text.replace(/(^|\s)(#[a-z\d-]+)/ig, makeLinkTag));
export const removeMultipleNewLines = memoize((str = '') => str.replace(/(\r\n|\r|\n){2,}/g, '$1\n'));
export const makeLink = memoize((text = '') => text.replace(URL_REGEX, url => `<a target="_blank" href="${url}">${url}</a>`));

export const getTextContent = memoize((content) => {
  const text = document.createElement('div');
  text.innerHTML = content;

  return text.textContent;
});

export const sanitizePostText = memoize(html => sanitizeHtml(html, {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'figure', 'h2', 'h1']),
  allowedIframeHostnames: ['www.youtube.com'],
  allowedSchemes: ['http', 'https'],
  allowedAttributes: {
    iframe: ['src'],
    a: ['href', 'name', 'target', 'class'],
    img: ['src'],
  },
  allowedClasses: {
    div: [
      'medium-insert-images',
      'medium-insert-images-grid',
      'medium-insert-images-wide',
      'medium-insert-embeds',
      'medium-insert-embeds-wide',
      'medium-insert-embed',
      'medium-upload-iframe-wrapper',
    ],
  },
  transformTags: {
    'a': sanitizeHtml.simpleTransform('a', { target: '_blank' }),
  },
}));

export const sanitizeCommentText = memoize(html => sanitizeHtml(html, {
  allowedTags: ['a'],
  allowedSchemes: ['http', 'https'],
  allowedAttributes: {
    a: ['href', 'target', 'class'],
  },
  textFilter: text => escapeQuotes(removeMultipleNewLines(makeLink(text))),
}));
