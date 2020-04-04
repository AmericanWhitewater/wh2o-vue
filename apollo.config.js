module.exports = {
  client: {
    service: {
      name: 'wh2o',
      url: process.env.VUE_APP_GRAPHQL_HTTP || 'http://localhost:8080/graphql'
    },
    includes: [
      'src/**/*.vue',
      'src/**/*.js'
    ]
  }
}
