/**
 * Configuration for Vue CLI
 * @reference https://cli.vuejs.org/config/
 *
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ModuleDependencyWarning = require("webpack/lib/ModuleDependencyWarning")

class IgnoreNotFoundExportPlugin {
    apply(compiler) {
        const messageRegExp = /export '.*'( \(reexported as '.*'\))? was not found in/
        function doneHook(stats) {
            stats.compilation.warnings = stats.compilation.warnings.filter(function(warn) {
                if (warn instanceof ModuleDependencyWarning && messageRegExp.test(warn.message)) {
                    return false
                }
                return true;
            })
        }
        if (compiler.hooks) {
            compiler.hooks.done.tap("IgnoreNotFoundExportPlugin", doneHook)
        } else {
            compiler.plugin("done", doneHook)
        }
    }
}

module.exports = {
  filenameHashing: true,
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
      .end();

     config
      .plugin("IgnoreNotFoundExportPlugin")
      .before("friendly-errors")
      .use(IgnoreNotFoundExportPlugin);

    config.resolve.alias.set('tinyqueue', path.join(__dirname, '/node_modules/tinyqueue/tinyqueue.js'))
  },
  configureWebpack: config => {
    config.optimization = {
      minimize: process.env.NODE_ENV === 'production'
    }
  },
  publicPath: process.env.VUE_APP_BASE_URL || '/'
}
