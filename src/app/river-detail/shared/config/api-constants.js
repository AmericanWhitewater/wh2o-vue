export const apiConstants = {
  // Reference : https://github.com/AmericanWhitewater/wh2o/wiki/API-V1-Rivers
  riverDetail: "/content/River/detail/id/",
  format: "/.json",
  gauge: {
    base: "/api/gauge/",
    readings: "/readings",
    source: "/source",
    metrics: "metrics"
  },
  weather:
    `https://api.darksky.net/forecast/${process.env.DARK_SKY_ACCESS_TOKEN}/`,
  gallery: null,
  accidents: null,
  credits: null,
  map: {
    base: null
  },
  graphql: "graphql/"
};
