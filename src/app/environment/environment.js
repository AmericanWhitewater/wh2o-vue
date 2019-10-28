const { NODE_ENV = "" } = process.env;

const environment = NODE_ENV.toLowerCase();
const apiBaseUrl =
  "https://cors-anywhere.herokuapp.com/https://prerelease.americanwhitewater.org/";

export { environment, apiBaseUrl };
