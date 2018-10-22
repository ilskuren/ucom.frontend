import config from '../../package.json';

export const getBackendConfig = () => {
  let conf = config.backend.staging;

  if (process.env.NODE_ENV === 'production') {
    conf = config.backend.production;
  }

  return conf;
};
