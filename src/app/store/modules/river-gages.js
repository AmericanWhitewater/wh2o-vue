import actions from "@/app/store/actions";
import mutations from "@/app/store/mutations";
import { getReachGages } from "@/app/services";

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
    async getProperty(context, id) {
      try {
        context.commit("DATA_REQUEST");
        const result = await getReachGages(id);

        if (!result.errors) {
          context.commit(
            "DATA_SUCCESS",
            result.data.getGaugeInformationForReachID
          );
        } else {
          context.commit("DATA_ERROR", result);
        }
      } catch (error) {
        context.commit("DATA_ERROR", error);
      }
    },
  },
};
