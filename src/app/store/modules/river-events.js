import actions from "@/app/store/actions";
import mutations from "@/app/store/mutations";
import { getReachEvents } from "@/app/services";

export default {
  namespaced: true,
  state: {
    error: false,
    loading: false,
    data: null,
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
    // this will return all event dates with the parent event tucked into "event", sorted descending by date.
    releaseDates: (state, getters) => {
      let intermediate = [];

      if (getters.releaseEvents?.length) {
        getters.releaseEvents.forEach((re) => {
          intermediate = intermediate.concat(
            re.dates.map((y) => ({ ...y, event: re }))
          );
        });
        return intermediate.sort((a, b) =>
          b.event_date.localeCompare(a.event_date)
        );
      }
      return [];
    },

    /**
     * Return the next release date, from today or last release that was listed.
     * @param state
     * @param getters
     * @return {null}
     */
    nextOrClosestReleaseDate: (state, getters) => {
      if (getters.releaseDates?.length) {
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0);

        const today = todayDate.toISOString().substring(0, 10);
        const index = getters.releaseDates.findIndex(
          (x) => x.event_date?.substring(0, 10) < today
        );
        //case of next release
        if (index >= 1) {
          return getters.releaseDates[index - 1];
        } //case lots of old releases, show the last one
        else if (index == 0) {
          return getters.releaseDates[index];
        }
        // every release date new so get the one closest to today's date.
        return getters.releaseDates[getters.releaseDates.length - 1];
      }
      return null;
    },

    /**
     * Returns all release events, cleaned up from the state object and concatenated together
     * @param state
     * @return {*[]}
     */
    events: (state) => {
      if (state && state.data && state.data.length) {
        const results = state.data.filter(
          (item) =>
            !!item.data &&
            item.data.length &&
            item.data[0]?.__typename === "Event"
        );

        if (results.length) {
          let rv = [];
          // unroll event arrays into rv
          Array.prototype.push.apply(rv, ...results.map((x) => x.data));
          return rv;
        }
      }
      //otherwise no events.
      return [];
    },
    // this will return all events that are releases associated with a river.
    releaseEvents: (state, getters) => {
      if (getters.events) {
        //eliminate linked resources down to release events for the river.
        const results = getters.events.filter(
          (item) => item.category === "CAT_RELEASE"
        );

        if (results) {
          return results;
        }
      }

      return [];
    },
    calendarData: (state, getters) => {
      if(getters.releaseDates){
        const thisYearsDates = getters.releaseDates
        .filter(release => new Date(release.event_date).getFullYear() === state.year)
        
        const dataSource = []

        for(let i = 0; i < thisYearsDates.length; i++){
          dataSource.push({
            startDate: new Date(thisYearsDates[i].event_date),
            endDate: new Date(thisYearsDates[i].event_date),
            startTime: thisYearsDates[i].start_time,
            endTime: thisYearsDates[i].end_time,
            minFlow: thisYearsDates[i].min,
            maxFlow: thisYearsDates[i].min
          })
        }

        return dataSource
      }
      
      return [[]]
    },

    documents: (state, getters) => {
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

