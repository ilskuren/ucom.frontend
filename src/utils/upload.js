import config from '../../package.json';

export const getFileUrl = filename => (
  `${config.backend.httpEndpoint}/upload/${filename}`
);
