module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: '\n              \n        @import \'@/app/assets/scss/abstracts/_variables.scss\';\n        @import \'@/app/assets/scss/abstracts/_mixins.scss\';\n        @import \'@/app/assets/scss/theme/_light.scss\';\n        @import \'@/app/assets/scss/vendor/_carbon-components-helpers.scss\';\n        @import \'@/app/assets/scss/helpers/_media-queries.scss\';\n\n        '
      }
    }
  },

  chainWebpack: config => {
    config.module
      .rule("file")
      .test(/\.(png|mp4|jpe?g|gif)$/i)
      .use("file-loader")
      .loader("file-loader")
      .end();
  }
};
