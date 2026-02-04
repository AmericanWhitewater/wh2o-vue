import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import { getUser, profileClient } from "@/app/services"

export default {
  namespaced: true,
  state: {
    error: false,
    loading: false,
    data: null,
    loggedIn: false
  },
  mutations,
  actions: {
    ...actions,
    getProperty: async (context) => {
      try {
        context.commit('DATA_REQUEST')
        const result = await getUser()

        // this is the first step towards integrating with the new cognito auth system
        // if not logged in to GQL API, query profile API for a JWT
        if (!result) {
          const profileResponse = await profileClient.whoAmI.query();
          if (profileResponse && profileResponse.loggedIn) {
            result.loggedIn = true;
          } else {
            result.loggedIn = false;
          }
        }

        context.commit('DATA_SUCCESS', result)

      } catch (error) {
        context.commit('DATA_ERROR', error)
      }
    },
    logout: (context) => {
      context.commit('DATA_RESET');
    }
  }
}
