const NODE_ENV = 'staging';
const HTTP_SERVER_PORT = 3020;

module.exports = {
  apps: [
    {
      name: `${NODE_ENV}_frontend_renderer`,
      instance_var: 'INSTANCE_ID',
      script: 'server.js',
      watch: ['public', 'server.js'],
      env: {
        PORT: HTTP_SERVER_PORT,
        NODE_ENV,
        autorestart: true,
      },
    },
  ],
};
