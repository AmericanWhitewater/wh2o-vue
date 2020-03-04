# Wh2o-vue

This app is the American Whitewater National Whitewater Index and River Detail SPA.

## Getting Started

This project requires the main American Whitewater API. Follow instructions in the dockerreadme.md located in the wh2o repo for development setup guidelines.

Clone the wh2o repo, build docker containers, and bring them up. The main API, which serves river info, flow data, and more, runs at [http://localhost:8080/](http://localhost:8080/). Be sure to update the env variables accordingly.

Since this app only requires the main wh2o API, we do not need the Asset Builder container running. It is resource-intensive and can significantly impact your machine's performance. In a separate terminal tab run `docker ps`, get the Id of the asset builder container, then run `docker stop {{ container_id }}`.

Once your main wh2o containers are up and running, cd into the wh2o-web root directory, `npm install` if it's it is the first time running the app, then run `npm run serve`. This command starts up Webpack dev server on [http://localhost:8081/](http://localhost:8081/).

## Local Component Styleguide

We have an existing component library/documentation for custom non-carbon design system components built using vue-styleguidist. To view the library and documentation, cd to `wh2o-web` root, then run `npm run styleguide`. This command brings up the guide at [http://localhost:6060/](http://localhost:6060/). Ports may need to be adjusted to avoid conflicts.

## Contributing

PR's welcome. For updates, hotfixes, and feature branches, please create them off of the `development` branch. Please note, before you open your PR, make sure to back merge development into your feature branch to stay aligned with the most recent work. It is imperative to NOT work directly on the `development` branch as this can lead to overwriting/conflicts.

## Access Tokens

To get access tokens for third party APIs like Mapbox and Darksky, contact an AW dev team member.

## Pre-Commit Hooks

To standardize code style and avoid regression, we use Yorkie to run pre-commit checks. Running these checks means that before you can push to the codebase, your staged files run through Eslint, and followed by all available unit tests. If an error is found in either you will be unable to commit the work. You can override this; however, please take the time to correct any issues found by the checks to ensure that you are not causing any unwanted regression, or undoing any of your teammates' work.

## Deployment

TBD. The current setup uses Express to serve static build files on Drew's personal Heroku.

## Demo

[https://wh2o-vue.herokuapp.com/#/](https://wh2o-vue.herokuapp.com/#/)
