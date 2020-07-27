import { reflectKeys } from '../services'

const initialState = {
  editMode: false,
  updateAvailable: false,
  toasts: [],
  offline: null
}

const namespacedPrefix = '[APP_GLOBAL]'

const mutationTypes = reflectKeys(
  ['EDIT_MODE', 'NEW_UPDATE', 'NEW_TOAST', 'NETWORK'],
  namespacedPrefix
)

const { EDIT_MODE, NEW_UPDATE, NEW_TOAST, NETWORK } = mutationTypes

const mutations = {

  [NEW_UPDATE] (state, payload) {
    Object.assign(state, { updateAvailable: payload })
  },

  [NEW_TOAST] (state, payload) {
    state.toasts.push(payload)
  },
  [EDIT_MODE] (state, payload) {
    Object.assign(state, { editMode: payload })
  },
  [NETWORK] (state, payload) {
    if (payload === 'offline') {
      state.offline = true
    } else {
      state.offline = false
    }
  }
}

export const globalAppActions = reflectKeys(
  ['TOGGLE_EDIT_MODE', 'UPDATE_AVAILABLE', 'SEND_TOAST', 'NETWORK_STATUS'],
  namespacedPrefix
)

const actions = {
  [globalAppActions.TOGGLE_EDIT_MODE] (context, data) {
    context.commit(EDIT_MODE, data)
  },
  [globalAppActions.UPDATE_AVAILABLE] (context, data) {
    context.commit(NEW_UPDATE, data)
  },
  [globalAppActions.SEND_TOAST] (context, data) {
    data.id = String(Math.floor(Math.random() * 1000))
    context.commit(NEW_TOAST, data)
  },
  [globalAppActions.NETWORK_STATUS] (context, data) {
    context.commit(NETWORK, data)
  }
}

export default {
  mutations,
  actions,
  state: initialState
}
