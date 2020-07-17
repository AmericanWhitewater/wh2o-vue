## System Requirements

- [Node.js](https://nodejs.org/en/)

## Installation

To get started, clone the [repo](https://github.com/AmericanWhitewater/wh2o-api) and `cd` to the project root then run `npm run init`. This will copy the example `.env` file, install dependencies, then start up the dev server.

## Configuration

Before compiling the API, we need to provide a few environment variables. For .env values, contact [@drewalth](https://github.com/drewalth).

Run `cp .env.example .env`.

- `POSTGRES_HOST=` Database endpoint. 
- `POSTGRES_DB=` The database name.
- `POSTGRES_USER=` Database user credentials.
- `POSTGRES_PASSWORD=` Database user credentials.

## Development

To compile the API and bring up the development server, run `npm run serve` from the project directory root.

## Production

To build the API for a production environment run, `npm run build`. The API's static files will be available in `dist/`. 

To start the server in production, run `npm start`.
