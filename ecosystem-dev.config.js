const NODE_ENV = 'staging';
const HTTP_SERVER_PORT = 3020;

module.exports = {
  apps: [
    {
      name: `${NODE_ENV}_frontend_renderer`,
      instance_var: 'INSTANCE_ID',
      script: 'server.js',
      instances: 1,
      exec_mode: 'cluster',
      watch: ['public', 'server.js'],
      autorestart: true,
      env: {
        PORT: HTTP_SERVER_PORT,
        NODE_ENV,
      },
    },
  ],
};
