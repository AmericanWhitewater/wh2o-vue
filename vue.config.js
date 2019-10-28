module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
              
        @import '@/app/assets/scss/abstracts/_variables.scss';
        @import '@/app/assets/scss/abstracts/_mixins.scss';
        @import '@/app/assets/scss/theme/_light.scss';
        @import '@/app/assets/scss/vendor/_carbon-components-helpers.scss';
        @import '@/app/assets/scss/helpers/_media-queries.scss';

        `
      }
    }
  },
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule("file")
      .test(/\.(png|mp4|jpe?g|gif)$/i)
      .use("file-loader")
      .loader("file-loader")
      .end();
  }
};
