import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import { getReachGallery, getReachGalleryIndex } from '@/app/services'

export default {
  namespaced: true,
  state: {
    error: false,
    loading: false,
    data: null,
    refId: null,
    pagination: {
      perPage: 10,
      currentPage: 1
    },
    galleryIndex: []
  },
  mutations: {
    ...mutations,
    ['PAGINATION'](state, payload) {
      Object.assign(state, { loading: false, pagination: payload })
    },
    ['SET_INDEX'](state, payload) {
      Object.assign(state, { galleryIndex: payload })
    }
  },
  actions: {
    ...actions,
    async getIndex(context, reachId) {
      // because we have canonical URLs for photos within gallery mode, we need
      // an index of the gallery images by ID to determine what page of the gallery to display
      // when a reach gallery is first loaded, we have to load the index      
      try {
        const result = await getReachGalleryIndex(reachId)
        if (!result.errors) {
          context.commit('SET_INDEX', result.data.reach.photos.data.flatMap((img) => img.id))
        } else {
          context.commit('DATA_ERROR', result.errors)
        }
      } catch (error) {
        context.commit('DATA_ERROR', error)
      }
    },
    async getProperty(context, payload={}) {
      context.commit('DATA_REQUEST')
      try {
        // if payload paging info is passed, we're explicitly requesting a new page
        // if not, we're just calling for a refresh of what's already displaying, if anything
        // if pagination info hasn't been filled in yet, then this is the first request for images
        const result = await getReachGallery(payload.id, {
          perPage: payload.perPage || context.state.pagination.perPage,
          page: payload.page || context.state.pagination.currentPage
        })
        if (!result.errors) {
          context.commit('DATA_SUCCESS', result.data.reach.photos.data)
          context.commit('PAGINATION', result.data.reach.photos.paginatorInfo)
        } else {
          context.commit('DATA_ERROR', 'error')
        }
      } catch (error) {
        context.commit('DATA_ERROR', error)
      }
    },
  },
}
