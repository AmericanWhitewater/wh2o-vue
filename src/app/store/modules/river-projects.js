import actions from "@/app/store/actions";
import mutations from "@/app/store/mutations";
import { getReachProjects } from "@/app/services";

export default {
  namespaced: true,
  state: {
    error: false,
    loading: false,
    data: null,
    refId: null,
  },
  mutations,
  actions: {
    ...actions,
    async getProperty(context, wpID) {
      context.commit("DATA_REQUEST");

      try {
        const result = await getReachProjects(wpID);
        // sort by date
        result.sort((a, b) => new Date(b.date_gmt) - new Date(a.date_gmt));
        context.commit("DATA_SUCCESS", result);
      } catch (error) {
        context.commit("DATA_ERROR", error);
      }
    },
  },
};
