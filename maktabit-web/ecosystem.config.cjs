module.exports = {
  apps: [
    {
      name: 'maktabit-web',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3390',
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3390,
        NODE_OPTIONS: '--no-deprecation',
      },
    },
  ],
}
