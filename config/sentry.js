export default {
  dsn: process.env.SENTRY_DSN,
  tracing: {
    tracesSampleRate: 0,
    browserTracing: {},
    vueOptions: {
      tracing: true,
      hooks: ['mount', 'update', 'destroy'],
      timeout: 2000,
      trackComponents: true
    }
  }
};
