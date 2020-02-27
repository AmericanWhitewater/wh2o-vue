# wh2o endpoints

Endpoint config files can be found in the view's `/shared/config/api-constants.js`

Soon there will only be one end point to rule them all...

## river-detail

```
export const apiConstants = {
  // Reference : https://github.com/AmericanWhitewater/wh2o/wiki/API-V1-Rivers
  riverDetail: '/content/River/detail/id/',
  format: '/.json',
  gauge: {
    base: '/api/gauge/',
    readings: '/readings',
    source: '/source',
    metrics: 'metrics'
  },
  /** @temp proxy */
  weather: `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.VUE_APP_DARK_SKY_ACCESS_TOKEN}/`,
  graphql: 'graphql/'
}
```

## user

```
export const apiConstants = {
  users: '/content/User/do-login',
  format: '/.json',
  graphql: 'graphql/'
}
```

## safety

## river-search

```
export const apiConstants = {
  // Reference : https://github.com/AmericanWhitewater/wh2o/wiki/API-V1-Search
  base: '/content/River/search/.json',
  state: '?state=',
  level: '&level=',
  uknown: '&include=',
  atLeast: '&atleast=',
  atMost: '&atmost=',
  river: '&river='
}
```

## news-page

```
export const apiConstants = {
  // Reference : https://github.com/AmericanWhitewater/wh2o/wiki/API-V1-Articles
  newsPage: '/content/Article/view/articleid/',
  format: '/.json',
  frontPage: '/content/News/all/type/frontpagenews/subtype//page/0/.json',
  type: null,
  subtype: null
}
```
