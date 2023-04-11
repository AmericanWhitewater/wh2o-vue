import actions from "@/app/store/actions";
import mutations from "@/app/store/mutations";
import { getReachEvents } from "@/app/services";

export default {
  namespaced: true,
  state: {
    error: false,
    loading: false,
    data: [],
    year: new Date().getFullYear(),
  },
  mutations: {
    ...mutations,
    ['SET_CALENDAR_YEAR'](state, {year}){
      Object.assign(state, { year: year })
    }
  },
  actions: {
    ...actions,
    async getProperty(context, id) {
      try {
        context.commit("DATA_REQUEST");

        const result = await getReachEvents(id);

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
    upcomingReleases: (state, getters) => {
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0);

      return getters.releases.filter(x => x.event_date >= todayDate);
    },

    /**
     * Return the next release date, from today or last release that was listed.
     * @param state
     * @param getters
     * @return {null}
     */
    nextOrClosestReleaseDate: (state, getters) => {
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0);

        const releases = getters.releases;
        const index = releases.findIndex(
          (x) => x.event_date >= todayDate
        );
        // no future releases found, show the latest release we have
        if (index == -1) {
          return releases[releases.length-1];
        } else {
          return releases[index];
        }
    },

    // returns releases with the parent event tucked into "event", sorted ascending by date
    releases: (state) => {
      return state.data.filter(
        x => x.category === "CAT_RELEASE"
      ).flatMap(x => x.dates).map(x => ({
        ...x,
        event_date: new Date(x.event_date)
      })).sort((a, b) =>
        a.event_date > b.event_date
      );
    },

    calendarData: (state, getters) => {
      return getters.releases.map(x => ({
        startDate: x.event_date,
        endDate: x.event_date,
        startTime: x.start_time,
        endTime: x.end_time,
        minFlow: x.min,
        maxFlow: x.min
      }));
    },


  },
};

