export default {
  namespaced: true,
  state: {
    editMode: false,
    updateAvailable: false,
    toasts: [],
    offline: null
  },
  mutations: {
    ['NEW_UPDATE'](state, payload) {
      Object.assign(state, { updateAvailable: payload })
    },

    ['NEW_TOAST'](state, payload) {
      state.toasts.push(payload)
    },

    ['CLOSE_TOAST'](state, payload) {
      if (Number(payload) > -1) {
        state.toasts.splice(Number(payload), 1)
      } else {
        state.toasts.pop()
      }
    },

    ['EDIT_MODE'](state, payload) {
      Object.assign(state, { editMode: payload })
    },
    ['NETWORK'](state, payload) {
      if (payload === 'offline') {
        state.offline = true
      } else {
        state.offline = false
      }
    }
  },
  actions: {
    toggleEditMode(context, data) {
      context.commit('EDIT_MODE', data)
    },
    updateAvailable(context, data) {
      context.commit('NEW_UPDATE', data)
    },
    sendToast(context, data) {
      data.id = String(Math.floor(Math.random() * 1000))
      context.commit('NEW_TOAST', data)
    },
    networkStatus(context, data) {
      context.commit('NETWORK', data)
    },
    closeToast(context, data) {
      context.commit('CLOSE_TOAST', data)
    }
  }
}
