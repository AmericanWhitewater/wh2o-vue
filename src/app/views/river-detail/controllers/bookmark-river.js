import { appLocalStorage, httpClient } from '@/app/global/services'
const merge_array = (array1, array2) => {
  var result_array = []
  var arr = array1.concat(array2)
  var len = arr.length
  var assoc = {}

  while (len--) {
    var item = arr[len]

    if (!assoc[item]) {
      result_array.unshift(item)
      assoc[item] = true
    }
  }

  return result_array
}

/**
 * store bookmarked rivers in user local storage
 * @param {string} riverId
 */
const bookmarkRiver = (riverId) => {
  const bookmarkRivers = appLocalStorage.getItem('wh2o-bookmarked-rivers')

  if (!bookmarkRivers) {
    appLocalStorage.setItem('wh2o-bookmarked-rivers', [riverId])
  } else {
    const updatedBookmarks = merge_array(bookmarkRivers, [riverId])
    appLocalStorage.setItem('wh2o-bookmarked-rivers', updatedBookmarks)
  }

  const data = appLocalStorage.getItem('wh2o-bookmarked-rivers')

  return data
}

const fetchBookmarksData = data => {
  return httpClient
    .post('graphql/', {
      query: `
      query {
        reach(id:${data}) {
         river,
         section,
         class,
         id
      }
    }
    `
    })
    .then(res => res.data)
}
const fetchBookmarksGageData = data => {
  

  const gqlConfig = {
    query: `
      query {
        getGaugeInformationForReachID(id: ${data}) {
          gauges {
            gauge_max
            gauge_min
            class
            gauge_reading
          }
        }
      }`
  }

  return httpClient
    .post('graphql/', gqlConfig)
    .then(res => res.data)
}

export { bookmarkRiver, fetchBookmarksData, fetchBookmarksGageData }
