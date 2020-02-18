module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import '@/app/assets/scss/abstracts/_variables.scss';
          @import '@/app/assets/scss/abstracts/_mixins.scss';
          // @import '@/app/assets/scss/theme/_dark.scss';
          @import '@/app/assets/scss/vendor/_carbon-components-helpers.scss';
          @import '@/app/assets/scss/helpers/_media-queries.scss';       
          `
      }
    }
  },
  pwa: {
    name: 'American Whitewater',
    themeColor: '#cdd1d4',
    msTileColor: '#FFFFFF',
    assetsVersion: Math.floor(Math.random() * 1000000000),
    appleMobileWebAppCapable: 'yes',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/sw.js',
      swDest: 'service-worker.js'
    }
  },

  chainWebpack: config => {
    config.module
      .rule('file')
      .test(/\.(png|mp4|jpe?g|gif)$/i)
      .use('file-loader')
      .loader('file-loader')
      .end()
  }
}
