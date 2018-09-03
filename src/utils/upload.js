import config from '../../package.json';

export const getFileUrl = (filename) => {
  if (!filename || filename === 'null') {
    return null;
  }

  return `${config.backend.httpEndpoint}/upload/${filename}`;
};

export const getBase64FromFile = file => (
  new Promise((resolve) => {
    if (!file) {
      resolve(null);
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.readAsDataURL(file);
  })
);
