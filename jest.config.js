module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: ['/node_modules/(?!@carbon/icons-vue)', '/node_modules/(?!mapbox-gl)'],
  verbose: false
}
