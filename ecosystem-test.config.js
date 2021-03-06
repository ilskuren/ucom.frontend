const NODE_ENV = 'staging';
const HTTP_SERVER_PORT = 8080;
const BABEL_ENV = 'server';

module.exports = {
  apps: [
    {
      name: `${NODE_ENV}_frontend_renderer`,
      instance_var: 'INSTANCE_ID',
      script: 'server.js',
      watch: ['public', 'server.js'],
      env: {
        PORT: HTTP_SERVER_PORT,
        autorestart: true,
        NODE_ENV,
        BABEL_ENV,
      },
    },
  ],
};
