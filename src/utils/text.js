export const newLineToBR = str => str.replace(/\n/g, '<br>');

export const escapeQuotes = (text) => {
  if (text) {
    return text.replace(/&quot;/g, '"');
  }
  return null;
};

export const getTextContent = (content) => {
  const text = document.createElement('div');
  text.innerHTML = content;

  return text.textContent.trim();
};
