import config from '../../package.json';

export const getBackendConfig = () => {
  let conf = config.backend.production;

  if (process.env.NODE_ENV === 'development') {
    conf = config.backend.staging;
  }

  return conf;
};
