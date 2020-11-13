import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import { httpClient } from '@/app/global/services'

export default {
  namespaced: true,
  state: {
    error: false,
    loading: false,
    data: null,
    refId: null
  },
  mutations,
  actions: {
    ...actions,
    getProperty(context) {
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
    }
  }
}
