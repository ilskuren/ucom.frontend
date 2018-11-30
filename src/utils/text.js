import { memoize } from 'lodash';
import sanitizeHtml from 'sanitize-html';

window.sanitizeHtml = sanitizeHtml;

export const escapeQuotes = (text) => {
  if (!text) {
    return null;
  }

  return text.replace(/&quot;/g, '"');
};

export const getTextContent = (content) => {
  const text = document.createElement('div');
  text.innerHTML = content;

  return text.textContent;
};

export const sanitizePostText = memoize(html => sanitizeHtml(html, {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'figure', 'h2']),
  allowedIframeHostnames: ['www.youtube.com'],
  allowedSchemes: ['http', 'https'],
  allowedAttributes: {
    iframe: ['src'],
    a: ['href', 'name', 'target'],
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
    ],
  },
}));

export const sanitizeCommentText = memoize(html => sanitizeHtml(html, {
  allowedTags: ['a'],
  allowedSchemes: ['http', 'https'],
  allowedAttributes: {
    a: ['href', 'target'],
  },
}));
