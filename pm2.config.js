module.exports = {
  apps: [
    {
      name: 'my-flowers-app',
      exec_mode: 'cluster',
      instances: 'max',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
};
