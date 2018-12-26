const NODE_ENV = 'staging';
const HTTP_SERVER_PORT = 3020;
const IGNORE_WATCH = ['node_modules', 'public', 'logs'];

module.exports = {
  apps: [
    {
      name: `${NODE_ENV}_frontend_renderer`,
      instance_var: 'INSTANCE_ID',
      script: 'server.js',
      watch: ['public', 'server.js'],
      ignore_watch: IGNORE_WATCH,
      env: {
        PORT: HTTP_SERVER_PORT,
        NODE_ENV,
        autorestart: true,
      },
    },
  ],
};
