import { reflectKeys, appLocalStorage, Breakpoints } from '../services'

const initialState = {
  loading: false,
  error: null,
  editMode: false,
  updateAvailable: null,
  toasts: [],
  breakpoints: Breakpoints,
  windowWidth: null,
  offline: null
}

/**
 * @description check to see if we've shown the user this toast before
 * @param {object} newToast takes potential new toast notification
 *
 * @note this is no good...
 *
 */

const checkIfViewed = (newToast) => {
  const viewedToasts = appLocalStorage.getItem('viewedToasts')

  if (newToast.coreAction || newToast.kind === 'error') {
    return newToast
  }

  if (!viewedToasts) {
    appLocalStorage.setItem('viewedToasts', [newToast])

    return newToast
  } else {
    const toastViewed = viewedToasts.find(t => t.title === newToast.title)

    if (!toastViewed || newToast.label === 'Install' || newToast.override) {
      const data = viewedToasts
      data.push(newToast)
      appLocalStorage.setItem('viewedToasts', data)

      return newToast
    }

    return null
  }
}

const namespacedPrefix = '[APP_GLOBAL]'

const mutationTypes = reflectKeys(
  ['SUCCESS', 'REQUEST', 'ERROR', 'RESET', 'EDIT_MODE', 'NEW_UPDATE', 'NEW_TOAST', 'RESET_TOAST', 'CLOSE_TOAST', 'NETWORK'],
  namespacedPrefix
)

const { ERROR, LOADING, EDIT_MODE, RESET, NEW_UPDATE, NEW_TOAST, RESET_TOASTS, CLOSE_TOAST, NETWORK } = mutationTypes

const mutations = {
  [LOADING] (state, payload) {
    Object.assign(state, { loading: payload })
  },

  [NEW_UPDATE] (state, payload) {
    Object.assign(state, { updateAvailable: payload })
  },

  [NEW_TOAST] (state, payload) {
    if (checkIfViewed(payload)) {
      state.toasts.push(payload)
    }
  },

  [CLOSE_TOAST] (state, payload) {
    if (payload === 0) {
      state.toasts.shift()
    }
    if (payload === 1) {
      state.toasts.pop()
    }
  },

  [RESET_TOASTS] (state) {
    state.toasts = []
  },

  [ERROR] (state, payload) {
    Object.assign(state, {
      loading: false,
      data: null,
      error: payload || true
    })
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
  },

  [RESET] (state) {
    Object.assign(state, ...initialState)
  }
}

export const globalAppActions = reflectKeys(
  ['TOGGLE_EDIT_MODE', 'TOGGLE_LOADING', 'UPDATE_AVAILABLE', 'SEND_TOAST', 'RESET_TOASTS', 'CLOSE_TOAST', 'NETWORK_STATUS'],
  namespacedPrefix
)

const actions = {
  [globalAppActions.TOGGLE_EDIT_MODE] (context, data) {
    context.commit(EDIT_MODE, data)
  },
  [globalAppActions.TOGGLE_LOADING] (context, data) {
    context.commit(LOADING, data)
  },
  [globalAppActions.UPDATE_AVAILABLE] (context, data) {
    context.commit(NEW_UPDATE, data)
  },
  [globalAppActions.SEND_TOAST] (context, data) {
    data.id = Math.floor(Math.random() * 1000)
    context.commit(NEW_TOAST, data)
  },
  [globalAppActions.RESET_TOASTS] (context, data) {
    context.commit(RESET_TOASTS, data)
  },
  [globalAppActions.CLOSE_TOAST] (context, data) {
    context.commit(CLOSE_TOAST, data)
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
