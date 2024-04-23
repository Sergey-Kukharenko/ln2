import auth from './config/auth';
import axios from './config/axios';
import build from './config/build';
import buildModules from './config/build-modules';
import css from './config/css';
import device from './config/device';
import envCofig from './config/env';
import head from './config/head';
import modulesConfig from './config/modules';
import pluginsConfig from './config/plugins';
import robots from './config/robots';
import router from './config/router';
import sentry from './config/sentry';
import server from './config/server';
import sitemap from './config/sitemap';
import styleResources from './config/style-resources';

import type { NuxtConfig } from '@nuxt/types';

const isDev: boolean = process.env.NODE_ENV !== 'production';

const config: NuxtConfig = {
  ...(!isDev && {
    modern: 'client'
  }),
  envCofig,
  buildModules,
  css,
  device,
  head,
  router,
  pluginsConfig,
  robots,
  sitemap,
  modulesConfig,
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
  loading: { color: '#009959' },
  components: true
};

export default config;
