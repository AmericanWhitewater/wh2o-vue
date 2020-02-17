export const apiConstants = {
  // Reference : https://github.com/AmericanWhitewater/wh2o/wiki/API-V1-Rivers
  riverDetail: '/content/River/detail/id/',
  format: '/.json',
  gauge: {
    base: '/api/gauge/',
    readings: '/readings',
    source: '/source',
    metrics: 'metrics'
  },
  weather: `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.VUE_APP_DARK_SKY_ACCESS_TOKEN}/`,
  map: {
    base: null
  },
  graphql: 'graphql/'
}
