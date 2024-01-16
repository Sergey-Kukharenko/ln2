import auth from './config/auth';
import axios from './config/axios';
import build from './config/build';
import buildModules from './config/build-modules';
import css from './config/css';
import device from './config/device';
import env from './config/env';
import head from './config/head';
import router from './config/router';
import styleResources from './config/style-resources';
import server from './config/server';
import sentry from './config/sentry';
import modules from './config/modules';
import plugins from './config/plugins';
import robots from './config/robots';
import sitemap from './config/sitemap';

const isDev = process.env.NODE_ENV !== 'production';

export default {
  ...(!isDev && {
    modern: 'client'
  }),
  env,
  buildModules,
  css,
  device,
  head,
  router,
  plugins,
  robots,
  sitemap,
  modules,
  styleResources,
  server,
  gtm: {
    enabled: true,
    id: 'GTM-T7ZND9B',
    debug: true,
    pageTracking: true,
    pageViewEventName: 'nuxtRoute'
  },
  axios,
  proxy: {
    '/v1/': process.env.BASE_URL
  },
  auth,
  sentry,
  build,
  loading: { color: '#009959' }
};
