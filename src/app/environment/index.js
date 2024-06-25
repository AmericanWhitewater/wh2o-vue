/**
 * @note if you want to use an env variable with vue-cli, you have
 * to add VUE_APP_ to the beginning to get picked up.
 *
 * specifiy app url and api url. values can change based on where each
 * is being served from. For example, you could serve the vue spa statically
 * from AWS and the API from somewhere else...
 *
 */

const {
  VUE_APP_ARCGIS_API_KEY,
  VUE_APP_LARAVEL_DEPLOY,
  VUE_APP_WP_API_URL,
  VUE_APP_NWI_TILE_SERVER,
  VUE_APP_MAPBOX_ACCESS_TOKEN,
  VUE_APP_SATELLITE_MAP_LAYER_ID,
  VUE_APP_TOPO_MAP_LAYER_ID,
  VUE_APP_BASE_URL,
  VUE_APP_CLIENT_ID,
  VUE_APP_CLIENT_SECRET,
  VUE_APP_API_BASE_URL,
  VUE_APP_TRPC_API_URL,
  STATIC_ASSET_URL,
  NODE_ENV = '',
  VUE_APP_LINK_BASE_URL
} = process.env

const environment = NODE_ENV.toLowerCase()
const arcgisApiKey = VUE_APP_ARCGIS_API_KEY
const satelliteMapLayerId = VUE_APP_SATELLITE_MAP_LAYER_ID
const topoMapLayerId = VUE_APP_TOPO_MAP_LAYER_ID
const apiBaseUrl = VUE_APP_API_BASE_URL
const appBaseUrl = VUE_APP_BASE_URL
const assetBaseUrl = STATIC_ASSET_URL || VUE_APP_API_BASE_URL
const clientId = VUE_APP_CLIENT_ID
const clientSecret = VUE_APP_CLIENT_SECRET
const mapboxAccessToken = VUE_APP_MAPBOX_ACCESS_TOKEN
const nwiTileServer = VUE_APP_NWI_TILE_SERVER
const cmsBaseUrl = VUE_APP_WP_API_URL
const laravelDeploy = Boolean(VUE_APP_LARAVEL_DEPLOY)
const baseUrl = VUE_APP_LINK_BASE_URL
const trpcApiUrl = VUE_APP_TRPC_API_URL

export {
  environment,
  arcgisApiKey,
  apiBaseUrl,
  appBaseUrl,
  assetBaseUrl,
  mapboxAccessToken,
  nwiTileServer,
  cmsBaseUrl,
  clientId,
  clientSecret,
  laravelDeploy,
  baseUrl,
  satelliteMapLayerId,
  topoMapLayerId,
  trpcApiUrl
}
