import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'

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
    async getProperty(context, id) {
      try {
        context.commit('DATA_REQUEST')
        const result = await httpClient
          .post('/graphql', {
            query: `
                query {
                  
                    reach(id: "${data}") {
                      direction_default
                      custom_destination
                      county
                      permitid
                      permitinfo
                      permiturl
                      shuttledetails
                      zipcode
                      geom
                    }

              }
              
              `
          })
          .then(res => res.data)
        
        if (!result.errors) {
        context.commit('DATA_SUCCESS', result)
      }
        
      } catch (error) {
        console.log('error :>> ', error);
      }
    }
  }
}
