module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: ['/node_modules/(?!@carbon/icons-vue)', '/node_modules/(?!mapbox-gl)'],
  verbose: false,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/**/*-routes.{js,vue}',
    '!src/main.js',
    '!src/sw.js',
    '!src/app/plugins/**/*.js',
    '!src/registerServiceWorker.js',
    '!src/**/index.js',
    '!src/**/create-wrapper.js',
    '!src/**/api-constants.js'
  ],
  coverageReporters: ['lcov', 'text-summary'],
  moduleNameMapper: {
    '^.+\\.(css)$': '<rootDir>/src/utils/unit-test-helpers/CSSStub.js'
  }
}
