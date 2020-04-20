module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: ['/node_modules/(?!@carbon/icons-vue)', '/node_modules/(?!mapbox-gl)'],
  verbose: false,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/js/main.js',
    '!src/**/index.js',
    '!src/**/create-wrapper.js',
    '!src/**/api-constants.js'
  ]
}
