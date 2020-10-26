const {
  VUE_APP_BASE_URL,
  VUE_APP_ASSET_BASE_URL,
  VUE_APP_REST_API_BASE_URL,
  VUE_APP_GRAPHQL_API_BASE_URL,
  VUE_APP_GTAG_UA,
  VUE_APP_SENTRY_DSN,
  VUE_APP_MAPBOX_ACCESS_TOKEN,
  VUE_APP_NWI_TILE_SERVER,
  VUE_APP_LARAVEL_DEPLOY,
  NODE_ENV = ''
} = process.env

const environment = NODE_ENV.toLowerCase()
const graphqlApiBaseUrl = VUE_APP_GRAPHQL_API_BASE_URL
const restApiBaseUrl = VUE_APP_REST_API_BASE_URL
const baseUrl = VUE_APP_BASE_URL
const gTagUA = VUE_APP_GTAG_UA
const laravelDeploy = VUE_APP_LARAVEL_DEPLOY
const sentryDSN = VUE_APP_SENTRY_DSN
const mapboxAccessToken = VUE_APP_MAPBOX_ACCESS_TOKEN
const nwiTileServer = VUE_APP_NWI_TILE_SERVER
const assetBaseUrl = VUE_APP_ASSET_BASE_URL

export {
  assetBaseUrl,
  environment,
  laravelDeploy,
  nwiTileServer,
  graphqlApiBaseUrl,
  restApiBaseUrl,
  mapboxAccessToken,
  baseUrl,
  gTagUA,
  sentryDSN
}
