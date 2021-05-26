import actions from "@/app/store/actions";
import mutations from "@/app/store/mutations";
import { getReachEvents } from "@/app/services";
import { cloneDeep } from "lodash";

export default {
  namespaced: true,
  state: {
    error: false,
    loading: false,
    data: null,
  },
  mutations,
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

        return cloneDeep(
          intermediate.sort((a, b) => b.event_date.localeCompare(a.event_date))
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
    closestReleaseDate: (state, getters) => {
      if (getters.releaseDates?.length) {
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0);

        let today = todayDate.toISOString();
        return getters.releaseDates.find((x) => x.event_date < today) ?? null;
      }
      return null;
    },
    // puts today at the top, then counts forward, then counts backward from today
    // probably how most people would use this is "when is the next release?" at the top,
    // "when are the next couple releases?" near the top, "when were was the last release?"
    // scroll down
    releasesFromTodayThenPast: (state, getters) => {
      const dates = getters.releaseDates;
      if (dates && dates.length) {
        const today = new Date();
        today.setHours(0, 0, 0);

        let nextDateRecord = getters.closestReleaseDate;
        if (
          nextDateRecord &&
          nextDateRecord.event_date >= today.toISOString()
        ) {
          let nextIndex = dates.findIndex((x) => x.id === nextDateRecord.id);
          let lastIndex = dates.length;
          return cloneDeep([
            ...dates.slice(0, nextIndex - 1).reverse(),
            ...dates.slice(nextIndex + 1, lastIndex),
          ]);
        }

        return dates;
      }
      return [];
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

          // return a clone of the items.
          return cloneDeep(rv);
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
          return cloneDeep(results);
        }
      }

      return [];
    },
  },
};
