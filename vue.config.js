module.exports = {
  lintOnSave: false,
  devServer: {
    overlay: {
      error: false,
      warning: false
    }
  },
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import \'~@/assets/scss/vuetify/variables\''
      },
      scss: {
        prependData: '@import \'~@/assets/scss/vuetify/variables\';'
      }
    }
  },

  chainWebpack: (config) => {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector',
    'vuetify'
  ]
}
