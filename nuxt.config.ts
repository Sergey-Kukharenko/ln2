import runtimeConfig from './config/runtime-config';
import typescript from './config/typescript';
import buildModules from './config/build-modules';
import vite from './config/vite';
import head from './config/head';
import tailwindcss from './config/tailwindcss';
import nitro from './config/nitro';

export default defineNuxtConfig({
  plugins: [
    { src: '~/plugins/tooltipDirective.js', mode: 'client' },
    { src: '~/plugins/recaptcha.js', mode: 'client' },
  ],
  typescript,
  runtimeConfig,
  // @ts-ignore
  modules: buildModules,
  image: {
    domains: ['static.dev.flor2u.ru'],
  },
  vite,
  app: {
    // @ts-ignore
    head,
  },
  nitro,
  tailwindcss,
});
