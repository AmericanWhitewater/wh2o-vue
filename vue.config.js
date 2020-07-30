/**
 * Configuration for Vue CLI
 * @reference https://cli.vuejs.org/config/
 *
 */

const path = require('path')

module.exports = {
  filenameHashing: false,
  /**
   * disables lint on save which disrupts workflow.
   * linting reserved for pre-commit git hook.
   */
  lintOnSave: false,

  devServer: {
    /**
   * disables linting overlay which disrupts workflow.
   * linting reserved for pre-commit git hook.
   */
    overlay: {
      error: false,
      warning: false
    }
  },

  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import '@/app/assets/scss/abstracts/_variables.scss'; 
        @import '@/app/assets/scss/abstracts/_mixins.scss';         
        @import '@/app/assets/scss/vendor/_carbon-components-helpers.scss';
        `
      }
    }
  },

  /**
   * Progressive Web Application features
   * @reference https://cli.vuejs.org/config/#pwa
   *
   */
  pwa: {
    name: 'American Whitewater',
    themeColor: '#5a6872',
    backgroundColor: '#537653',
    msTileColor: '#FFFFFF',
    assetsVersion: Math.floor(Math.random() * 1000000000),
    appleMobileWebAppCapable: 'yes',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/sw.js',
      swDest: 'service-worker.js'
    },
    appleMobileWebAppStatusBarStyle: 'black'
  },
  chainWebpack: config => {
    config.module
      .rule('file')
      .test(/\.(png|mp4|jpe?g|gif)$/i)
      .use('file-loader')
      .loader('file-loader')
      .end()

    config.resolve.alias.set('tinyqueue', path.join(__dirname, '/node_modules/tinyqueue/tinyqueue.js'))
  },
  configureWebpack: config => {
    config.optimization = {
      minimize: process.env.NODE_ENV === 'production'
    }
  },
  publicPath: process.env.VUE_APP_BASE_URL || '/'
}
