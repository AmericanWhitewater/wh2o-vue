module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  transformIgnorePatterns: [
    "/node_modules/(?!@carbon/(.*))",
    "/node_modules/(?!@carbon/icons-vue)",
    "/node_modules/(?!mapbox-gl)",
  ],
  verbose: false,
  collectCoverageFrom: [
    "src/**/*.{js,vue}",
    "!src/**/*-routes.{js,vue}",
    "!src/main.js",
    "!src/sw.js",
    "!src/app/plugins/**/*.js",
    "!src/registerServiceWorker.js",
    "!src/**/index.js",
    "!src/**/create-wrapper.js",
    "!src/**/api-constants.js",
  ],
  modulePathIgnorePatterns: ["node_modules/*", "components/*"],
  moduleFileExtensions: [
    "js",
    "ts",
    "gql",
    "json",
    // tell Jest to handle `*.vue` files
    "vue",
  ],
  globals: {
    "ts-jest": { diagnostics: false },
  },
  transform: {
    // process `*.vue` files with `vue-jest`
    ".*\\.(vue)$": "vue-jest",
    "^.+\\.tsx?$": "ts-jest",
    "\\.(gql|graphql)$": "jest-transform-graphql",
    ".*": "babel-jest",
  },
  coverageReporters: ["lcov", "text-summary"],
  moduleNameMapper: {
    "^.+\\.(css)$": "<rootDir>/src/utils/unit-test-helpers/CSSStub.js",
  },
};
