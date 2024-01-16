const isDev = process.env.NODE_ENV !== 'production';

export default {
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
  },

  babel: {
    presets(env, [preset, options]) {
      return [['@babel/preset-env', options]];
    }
  }
};
