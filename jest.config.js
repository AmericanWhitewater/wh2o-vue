module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  transformIgnorePatterns: [
    "/node_modules/(?!(@carbon/icons-vue|mapbox-gl|@mapbox))/",
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
  transform: { "\\.ts$": ["ts-jest"] },
  coverageReporters: ["lcov", "text-summary"],
  moduleNameMapper: {
    "^.+\\.(css)$": "<rootDir>/src/utils/unit-test-helpers/CSSStub.js",
  },
  setupFiles: [
    "<rootDir>/jest.init.js"
  ]
};
