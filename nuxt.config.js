const isDev = process.env.NODE_ENV !== 'production';

export default {
  ...(!isDev && {
    modern: 'client'
  }),

  // Global page headers: https://go.nuxtjs.dev/config-head
  env: {
    basePureUrl: process.env.BASE_PURE_URL,
    baseUrl: process.env.BASE_URL,
    host: process.env.HOST,
    port: process.env.PORT,
    fileUrl: process.env.FILE_URL,
    fileCategoriesUrl: process.env.FILE_CATEGORIES_URL,
    stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
    paypalSecretKey: process.env.PAYPAL_SECRET_KEY,
    paypalClientId: process.env.PAYPAL_CLIENT_ID,
    woosmapPublicKey: process.env.WOOSMAP_PUBLIC_KEY,
    idealPostcodesAutocompleteUrl: process.env.IDEAL_POSTCODES_AUTOCOMPLETE_URL,
    idealPostcodesKey: process.env.IDEAL_POSTCODES_KEY
  },

  publicRuntimeConfig: {
    gtm: {
      id: process.env.GOOGLE_TAG_MANAGER_ID
    }
  },

  server: {
    port: process.env.PORT,
    host: process.env.HOST
  },

  head: {
    title: 'MyFlowers',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'facebook-domain-verification', content: 'l0j1vu5w4k80362s29i1t5ie24fboc' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,200;0,7..72,300;0,7..72,400;0,7..72,500;0,7..72,600;0,7..72,700;0,7..72,800;0,7..72,900;1,7..72,200;1,7..72,300;1,7..72,400;1,7..72,500;1,7..72,600;1,7..72,700;1,7..72,800;1,7..72,900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet'
      }
    ]
  },

  router: {
    prefetchLinks: false
  },

  // Customize the progress-bar color
  loading: { color: '#009959' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/normalize.css', '~/assets/css/fonts.css', 'swiper/css/swiper.css'],

  styleResources: {
    scss: ['~/assets/scss/index.scss']
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-awesome-swiper', ssr: true },
    { src: '~/plugins/vuelidate' },
    { src: '~/plugins/gtm', mode: 'client' },
    { src: '~/plugins/vue-observe-visibility', mode: 'client' },
    '~/plugins/v-mask',
    '~/plugins/axios'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/device',
    'vue-toastification/nuxt'
  ],

  device: {
    refreshOnResize: true
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/device',
    'cookie-universal-nuxt',
    '@nuxtjs/gtm',
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
    ]
  ],

  svgSprite: {
    // input: '~/assets/sprite/svg/',
    // output: '~/public/sprite',
  },

  gtm: {
    id: process.env.GOOGLE_TAG_MANAGER_ID,
    enabled: true
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BASE_URL || '/',
    retry: { retries: 0 }
  },

  auth: {
    plugins: [{ src: '~/plugins/axios', ssr: true }]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    filenames: {
      app: ({ isDev }) => (isDev ? '[name].js' : 'js/[contenthash].js'),
      chunk: ({ isDev }) => (isDev ? '[name].js' : 'js/[contenthash].js'),
      css: ({ isDev }) => (isDev ? '[name].css' : 'css/[contenthash].css'),
      img: ({ isDev }) => (isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]')
    },
    ...(!isDev && {
      html: {
        minify: {
          collapseBooleanAttributes: true,
          decodeEntities: true,
          minifyCSS: true,
          minifyJS: true,
          processConditionalComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          trimCustomFragments: true,
          useShortDoctype: true
        }
      },

      optimization: {
        minimize: !isDev
      },

      splitChunks: {
        layouts: true,
        pages: true,
        commons: true
      }
    }),

    loaders: {
      sass: {
        implementation: require('sass')
      },
      scss: {
        implementation: require('sass')
      }
    }
  }
};
