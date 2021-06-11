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
    month: new Date().getMonth()
  },
  mutations: {
    ...mutations,
    ['SET_CALENDAR_DATE'](state, {year, month}){
      Object.assign(state, { year: year, month: month })
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
    calendar: state => {
      if (state.data) {
        const results = state.data.filter(item => !!item.data && item.data.length && item.data[0]?.category)
        if (results.length) { 
          const monthArr = []
          const previousMonthsLastdays = []
          monthArr.push(previousMonthsLastdays)
          const day = new Date(state.year, state.month, 1);
          for(let i = day.getDay(); i > 0; i--){
            const copy = new Date(day)
            copy.setDate(day.getDate() - i)
            const release = results[0].data[0].dates.find(release => {
              return new Date(release.event_date).toDateString() === copy.toDateString() 
            })
            previousMonthsLastdays.push({
              day: copy,
              release: release !== undefined ? release : "no release"
            })
            
          }
          while(day.getMonth() === state.month){
            if(day.getDay() === 0){
              const week = []
              monthArr.push(week)
            }
            const release = results[0].data[0].dates.find(release => {
              return new Date(release.event_date).toDateString() === day.toDateString() 
            })
            monthArr[monthArr.length - 1].push({ 
              day: new Date(day), 
              release: release !== undefined ? release : "no release"
            })
            day.setDate(day.getDate() + 1)
          }
          return monthArr
        }
      }
      return [[]]
    }
  },
};

