import actions from "@/app/store/actions";
import mutations from "@/app/store/mutations";
import { getReachDocuments } from '@/app/services'

export default {
  namespaced: true,
  state: {
    error: false,
    loading: false,
    data: null,
  },
  mutations: {
    ...mutations,

  },
  actions: {
    ...actions,
    async getProperty(context, id) {
      try {
        context.commit("DATA_REQUEST");

        const result = await getReachDocuments(id);

        if (!result.errors) {
          context.commit("DATA_SUCCESS", result);
        }
      } catch (error) {
        context.commit("DATA_ERROR", error);
      }
    },
    setCalendarDate(context, date) {
      context.commit('SET_CALENDAR_DATE', date)
    },
  },
  getters: {
    documents: (state) => {
      if (state && state.data && state.data.length) {

        const results = state.data.filter(
          (item) =>
            !!item.data &&
            item.data.length &&
            item.data[0]?.__typename === "Document"
        );
        const response = results[0]?.data
        if (response?.length) {
          return response;
        }
      }
      return [];
    }
  },
};

