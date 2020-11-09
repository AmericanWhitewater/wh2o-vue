/**
 * Configuration for Vue CLI
 * @reference https://cli.vuejs.org/config/
 *
 */

require("dotenv").config();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ModuleDependencyWarning = require("webpack/lib/ModuleDependencyWarning");

// are we running debug build?
function isDebug() {
  return process.env.NODE_ENV !== "production";
}

//is the app build for embedding
function isEmbedded() {
  return process.env.VUE_APP_LARAVEL_DEPLOY;
}

class IgnoreNotFoundExportPlugin {
  apply(compiler) {
    const messageRegExp = /export '.*'( \(reexported as '.*'\))? was not found in/;
    function doneHook(stats) {
      stats.compilation.warnings = stats.compilation.warnings.filter(function (
        warn
      ) {
        if (
          warn instanceof ModuleDependencyWarning &&
          messageRegExp.test(warn.message)
        ) {
          return false;
        }
        return true;
      });
    }
    if (compiler.hooks) {
      compiler.hooks.done.tap("IgnoreNotFoundExportPlugin", doneHook);
    } else {
      compiler.plugin("done", doneHook);
    }
  }
}

// https://stackoverflow.com/questions/53431754/styling-not-applied-to-vue-web-component-during-development
// ?? - if HMR - https://github.com/vuejs/vue-style-loader/pull/41/commits/c722f1cb5c2856a1197a13f04317506453c14add
function enableShadowCss(config) {
  const configs = [
    config.module.rule("vue").use("vue-loader"),
    config.module.rule("css").oneOf("vue-modules").use("vue-style-loader"),
    config.module.rule("css").oneOf("vue").use("vue-style-loader"),
    config.module.rule("css").oneOf("normal-modules").use("vue-style-loader"),
    config.module.rule("css").oneOf("normal").use("vue-style-loader"),
    config.module.rule("postcss").oneOf("vue-modules").use("vue-style-loader"),
    config.module.rule("postcss").oneOf("vue").use("vue-style-loader"),
    config.module
      .rule("postcss")
      .oneOf("normal-modules")
      .use("vue-style-loader"),
    config.module.rule("postcss").oneOf("normal").use("vue-style-loader"),
    config.module.rule("scss").oneOf("vue-modules").use("vue-style-loader"),
    config.module.rule("scss").oneOf("vue").use("vue-style-loader"),
    config.module.rule("scss").oneOf("normal-modules").use("vue-style-loader"),
    config.module.rule("scss").oneOf("normal").use("vue-style-loader"),
    config.module.rule("sass").oneOf("vue-modules").use("vue-style-loader"),
    config.module.rule("sass").oneOf("vue").use("vue-style-loader"),
    config.module.rule("sass").oneOf("normal-modules").use("vue-style-loader"),
    config.module.rule("sass").oneOf("normal").use("vue-style-loader"),

    config.module.rule("less").oneOf("vue-modules").use("vue-style-loader"),
    config.module.rule("less").oneOf("vue").use("vue-style-loader"),
    config.module.rule("less").oneOf("normal-modules").use("vue-style-loader"),
    config.module.rule("less").oneOf("normal").use("vue-style-loader"),
    config.module.rule("stylus").oneOf("vue-modules").use("vue-style-loader"),
    config.module.rule("stylus").oneOf("vue").use("vue-style-loader"),
    config.module
      .rule("stylus")
      .oneOf("normal-modules")
      .use("vue-style-loader"),
    config.module.rule("stylus").oneOf("normal").use("vue-style-loader"),
  ];
  configs.forEach((c) =>
    c.tap((options) => {
      options.shadowMode = true;
      return options;
    })
  );
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

    headers: { "Access-Control-Allow-Origin": "*" },
    overlay: {
      error: false,
      warning: false,
    },
  },

  css: {
    extract: false,
    loaderOptions: {
      sass: {
        prependData: `
        @import '@/app/assets/scss/abstracts/_variables.scss'; 
        @import '@/app/assets/scss/abstracts/_mixins.scss';         
        @import '@/app/assets/scss/vendor/_carbon-components-helpers.scss';
        `,
      },
    },
  },

  /**
   * Progressive Web Application features
   * @reference https://cli.vuejs.org/config/#pwa
   *
   */
  pwa: {
    name: "American Whitewater",
    themeColor: "#5a6872",
    backgroundColor: "#537653",
    msTileColor: "#FFFFFF",
    assetsVersion: Math.floor(Math.random() * 1000000000),
    appleMobileWebAppCapable: "yes",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "./src/sw.js",
      swDest: "service-worker.js",
    },
    appleMobileWebAppStatusBarStyle: "black",
  },
  chainWebpack: (config) => {
    config.module
      .rule("file")
      .test(/\.(png|mp4|jpe?g|gif)$/i)
      .use("file-loader")
      .loader("file-loader")
      .end();

    config
      .plugin("IgnoreNotFoundExportPlugin")
      .before("friendly-errors")
      .use(IgnoreNotFoundExportPlugin);

    config.resolve.alias.set(
      "tinyqueue",
      path.join(__dirname, "/node_modules/tinyqueue/tinyqueue.js")
    );

    if (isEmbedded()) {
      // eslint-disable-next-line no-console
      console.log("using shadow");
      enableShadowCss(config);
    }
  },
  productionSourceMap: isDebug(), // NOTE: this is default
  configureWebpack: (config) => {
    config.optimization = {
      minimize: !isDebug(),
    };
    if (isDebug()) {
      config.devtool = "source-map";
    }
    config.output.jsonpFunction = "spa_wh2o_vue";
    //config.output.libraryExport = "default";
    //return config;
  },
  publicPath: process.env.VUE_APP_BASE_URL || "/",
};
