import Vue from 'vue';

// this bus was introduced to manage the need to refresh data from the
// new APIs, keeping that process separate from the existing
// Vuex state-based logic. When components down the tree update
// data that were queried near the top, the event bus
// can be used to listen for those events and trigger a refresh
export const eventBus = new Vue();
