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
  VUE_APP_WP_API_URL,
  VUE_APP_NWI_TILE_SERVER,
  VUE_APP_MAPBOX_ACCESS_TOKEN,
  VUE_APP_BASE_URL,
  VUE_APP_CLIENT_ID,
  VUE_APP_CLIENT_SECRET,
  VUE_APP_API_BASE_URL,
  NODE_ENV = ''
} = process.env

const environment = NODE_ENV.toLowerCase()
const apiBaseUrl = VUE_APP_API_BASE_URL
const appBaseUrl = VUE_APP_BASE_URL
const clientId = VUE_APP_CLIENT_ID
const clientSecret = VUE_APP_CLIENT_SECRET
const mapboxAccessToken = VUE_APP_MAPBOX_ACCESS_TOKEN
const nwiTileServer = VUE_APP_NWI_TILE_SERVER
const cmsBaseUrl = VUE_APP_WP_API_URL

export {
  environment,
  apiBaseUrl,
  appBaseUrl,
  mapboxAccessToken,
  nwiTileServer,
  cmsBaseUrl,
  clientId,
  clientSecret
}
