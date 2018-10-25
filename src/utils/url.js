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
