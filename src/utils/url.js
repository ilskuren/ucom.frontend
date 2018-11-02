export const extractHostname = (url) => {
  if (url) {
    let hostname;

    if (url.indexOf('//') > -1) {
      [, , hostname] = url.split('/');
    } else {
      [hostname] = url.split('/');
    }

    [hostname] = hostname.split(':');
    [hostname] = hostname.split('?');

    const name = hostname.replace('www.', '').split('.');
    name.pop();
    return name.join('.');
  }

  return null;
};

export const makeLink = (text) => {
  const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

  if (urlRegex.test(text)) {
    text = text.replace(urlRegex, url => `<a target="_blank" href="${url}"> ${url}</a>`);
  }

  return { __html: text };
};
