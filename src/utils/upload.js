import config from '../../package.json';

export const getFileUrl = (filename) => {
  if (!filename || filename === 'null') {
    return null;
  }

  return `${config.backend.httpEndpoint}/upload/${filename}`;
};

export const getBase64FromFile = file => (
  new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('Error: Can\'t get base 64 from file'));
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.readAsDataURL(file);
  })
);
