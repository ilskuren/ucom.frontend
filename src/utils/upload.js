import config from '../../package.json';

export const getFileUrl = (filename) => {
  if (filename) {
    return `${config.backend.httpEndpoint}/upload/${filename}`;
  }

  return null;
};
