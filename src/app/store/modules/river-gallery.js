import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import { httpClient } from '@/app/global/services'

export default {
  namespaced: true,
  state: {
    error: false,
    loading: false,
    data: null,
    refId: null,
    pagination: null
  },
  mutations: {
    ...mutations,
    ['PAGINATION'](state, payload) {
      Object.assign(state, { loading: false, pagination: payload })
    },
  },
  actions: {
    ...actions,
    async fetchGalleryData(context, data) {
      context.commit('DATA_REQUEST')
      try {
        const result = await httpClient
          .post('/graphql', {
            query: `
                query {
                  posts(
                    first: ${data.per_page},
                    post_types: [JOURNAL,PHOTO_POST],
                    reach_id: "${data.reach_id}", 
                    page: ${data.page}, 
                    orderBy: {field: REVISION, order: DESC}
                    ) {
                      data {
                        id
                        metric {
                          name
                          unit
                        }
                        gauge {
                          id
                          name
                        }
                        reading
                        photos {
                          image {
                            uri {
                              thumb
                              medium
                              big
                            }
                            file_size
                          }
                          id
                          author
                          caption
                          description
                          photo_date
                          poi_name
                          poi_id
                          subject
                        }
                      }
                      paginatorInfo {
                        count
                        perPage
                        currentPage
                        lastPage
                        total
                      }
                  
                    }  
                  }`
          })
          .then(res => res.data)
        if (!result.errors) {
          context.commit('DATA_SUCCESS', result.data.posts.data)
          context.commit('PAGINATION', result.data.posts.paginatorInfo)
        } else {
          context.commit('DATA_ERROR', 'error')
        }
      } catch (error) {
        context.commit('DATA_ERROR', error)
      }
    },
  },
  getters: {
    media: state => {
      if (state.data) {
        const images = state.data.flatMap((post) => {
          return post.photos.map((photo) => {
            return {
              ...photo,
              reading: post.reading,
              gauge: post.gauge,
              metric: post.metric,
              post_date: post.post_date
            }
          })
        })

        return images
      }

      return null
    }
  }
}
