export default {
  baseURL: process.env.BASE_URL || `http://${process.env.HOST}:${process.env.PORT}`,
  proxy: true,
  proxyHeaders: true,
  retry: { retries: 0 }
};
