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
    "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/70cc8053ba7adef4965fd2b173bea0a0/",
  // gallery: {
  //   base: "/content/Photo/do-search/?rivername=",
  //   // temporary
  //   params:
  //     "&rapidname=&title=&author=&subject=&state=any&max=12&orderby=id&sort=desc&incphotos=on&incvideos=on&ext=&dosearch=Photo+Search/.json"
  // },
  gallery: null,
  accidents: null,
  credits: null,
  map: {
    base: null
  },
  graphql: "graphql/"
};
