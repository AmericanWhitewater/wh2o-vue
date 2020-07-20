## System Requirements

- [Node.js v12](https://nodejs.org/en/)

## Installation

To get started, clone the [repo](https://github.com/AmericanWhitewater/wh2o-vue) and `cd` to the project root then run `npm install` for project dependencies.

## Configuration

Before compiling the API, we need to provide a few environment variables. For .env values, contact [@drewalth](https://github.com/drewalth).

```
VUE_APP_BASE_URL=/
VUE_APP_API_BASE_URL=http://localhost:8080/
VUE_APP_MAPBOX_ACCESS_TOKEN=
VUE_APP_NWI_TILE_SERVER=http://localhost:8080/tiles/{z}/{x}/{y}.mvt/
VUE_APP_GRAPHQL_HTTP=http://localhost:8080/graphql/
VUE_APP_APOLLO_DEV_HELPER=
VUE_APP_CLIENT_ID=
VUE_APP_CLIENT_SECRET=
VUE_APP_SENTRY_DSN=
```

## API 

This app requires the [`wh2o`](https://github.com/AmericanWhitewater/wh2o) project. Follow the build instructions. When all the containers are up and running, the API will be available at `http://localhost:8080`. Add this to the .env file: 

```
VUE_APP_API_BASE_URL=http://localhost:8080
VUE_APP_GRAPHQL_HTTP=http://localhost:8080/graphql 
VUE_APP_NWI_TILE_SERVER=http://localhost:8080/tiles/{z}/{x}/{y}.mvt/
```

If you do not have access to the [`wh2o`](https://github.com/AmericanWhitewater/wh2o) project, you can use the beta site instead.

```
VUE_APP_API_BASE_URL=https://beta.americanwhitewater.org
VUE_APP_GRAPHQL_HTTP=https://beta.americanwhitewater.org/graphql
VUE_APP_NWI_TILE_SERVER=https://beta.americanwhitewater.org/tiles/{z}/{x}/{y}.mvt/
```

## Development

To compile the app and bring up the development server, run `npm run serve` from the project directory root.

## Production

To build the app for a production environment run, `npm run build`. The app's static files will be available in `dist/`.

To start the server in production, run `npm start`.
