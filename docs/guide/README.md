## System Requirements

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Chrome](https://www.google.com/chrome/) (e2e testing)
- [Firefox](https://www.mozilla.org/en-US/firefox/) (e2e testing)
- [Visual Studio Code](https://code.visualstudio.com/) (highly recommended)

## API

First, we need to set up the API. Clone the [wh2o](https://github.com/AmericanWhitewater/wh2o) project, and follow build instructions. Once the containers have been built, and are running, the API will be available at `http://localhost:8080`.

## Installation

To get started, `cd` to the project root then run `npm run install`. This will add project dependencies.

## Configuration

Before compiling the app, we need to provide a few environment variables.

Run `cp .env.example .env`.

- `VUE_APP_BASE_URL=` Modify if the app is to be served from a subdirectory. 
- `VUE_APP_API_BASE_URL=` The API connection and base URL for the HTTP client.
- `VUE_APP_MAPBOX_ACCESS_TOKEN=` The token for the AW Mapbox account.
- `VUE_APP_NWI_TILE_SERVER=` The URL from which the NWI Map tiles are served.
- `VUE_APP_GRAPHQL_HTTP=` The API connection and base URL for the Graphql client.
- `VUE_APP_APOLLO_DEV_HELPER=` Enables the Apollo client for local development.
- `VUE_APP_CLIENT_ID=` Used to authorize the app with the API.
- `VUE_APP_CLIENT_SECRET=` Used to authorize the app with the API.
- `VUE_APP_SENTRY_DSN=` The token for [Sentry.io](https://sentry.io/welcome/) error monitoring.

### Example

`.env`

```
VUE_APP_BASE_URL=/
VUE_APP_API_BASE_URL=http://localhost:8080/
VUE_APP_MAPBOX_ACCESS_TOKEN=token
VUE_APP_NWI_TILE_SERVER=http://localhost:8080/tiles/{z}/{x}/{y}.mvt/
VUE_APP_GRAPHQL_HTTP=http://localhost:8080/graphql
VUE_APP_APOLLO_DEV_HELPER=
VUE_APP_CLIENT_ID=123
VUE_APP_CLIENT_SECRET=foo
VUE_APP_SENTRY_DSN=123
```

## Development

To compile the app and bring up the development server, run `npm run serve`.

## Production

To build the app for a production environment run, `npm run build`. The app's static files will be available in `dist/`.
