const isProduction = process.env.NODE_ENV === 'production';

const modules = [
  // https://go.nuxtjs.dev/axios
  '@nuxtjs/gtm',
  '@nuxtjs/axios',
  '@nuxtjs/svg-sprite',
  '@nuxtjs/device',
  'cookie-universal-nuxt',
  '@nuxtjs/robots',
  '@nuxtjs/sitemap',
  '@nuxt/image',
  [
    '@netsells/nuxt-hotjar',
    {
      id: process.env.HOTJAR_ID,
      sv: process.env.HOTJAR_SV
    }
  ],
  [
    'nuxt-facebook-pixel-module',
    {
      /* module options */
      pixelId: process.env.FACEBOOK_PIXEL_ID,
      autoPageView: true
    }
  ],
  [
    'nuxt-trustbox-module',
    {
      businessunitId: process.env.TRUSTPILOT_BUSINESSUNIT_ID,
      businessunitName: process.env.TRUSTPILOT_BUSINESSUNIT_NAME
    }
  ]
];

if (isProduction) {
  modules.push('@nuxtjs/sentry');
}

export default modules;
