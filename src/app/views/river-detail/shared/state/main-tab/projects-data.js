import { reflectKeys } from '@/app/global/services'
import { fetchReachProjectsData } from '../../services'

const initialState = {
  data: null,
  error: null,
  loading: false
}

const namespacedPrefix = '[PROJECTS]'

const mutationTypes = reflectKeys(
  ['DATA_SUCCESS', 'DATA_REQUEST', 'DATA_ERROR'],
  namespacedPrefix
)

const { DATA_ERROR, DATA_REQUEST, DATA_SUCCESS } = mutationTypes

const mutations = {
  [DATA_REQUEST] (state) {
    Object.assign(state, { loading: true, error: null })
  },

  [DATA_SUCCESS] (state, payload) {
    Object.assign(state, { loading: false, data: payload })
  },

  [DATA_ERROR] (state, payload) {
    Object.assign(state, {
      loading: false,
      data: null,
      error: payload || true
    })
  }
}

export const projectsActions = reflectKeys(
  ['FETCH_PROJECTS_DATA'],
  namespacedPrefix
)

const actions = {
  async [projectsActions.FETCH_PROJECTS_DATA] (context, data) {
    context.commit(DATA_REQUEST)

    const result = await fetchReachProjectsData(data).catch(e => {
      context.commit(DATA_ERROR, e)
    })
    if (result.errors) {
      context.commit(DATA_ERROR, result.errors)
    } else {
      const projectsResult = result.data.linker.find(x => x.type === 'PROJECT')
      if (projectsResult) {
        context.commit(DATA_SUCCESS, projectsResult.data)
      } else {
        context.commit(DATA_SUCCESS, [])
      }
    }

    return result
  }
}

export default {
  mutations,
  actions,
  state: initialState
}
